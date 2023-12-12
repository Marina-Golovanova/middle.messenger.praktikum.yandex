import { deepCopy } from '@utils/deepCopy';
import { isEqual } from '@utils/isEqual';
import { EventBus } from '@modules/system/event-bus';

import type { IComponentProps, IListener } from '@types';
import { render } from './utils/render';

type IMeta<Props, Attributes> = {
  tagName: string;
} & IComponentProps<Props, Attributes>;

export abstract class Block<
  Props extends object = Record<string, unknown>,
  TypeElement extends HTMLElement = HTMLElement,
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  props?: Props;
  attributes?: Partial<TypeElement>;
  listeners?: IListener[];
  propsChildren?: Block[];
  children?: Block[];
  private _eventBus: () => EventBus;

  private _element: TypeElement = this._createDocumentElement('div');
  private _meta: IMeta<Props, Partial<TypeElement>> = { tagName: 'div' };

  constructor(data: IMeta<Props, Partial<TypeElement>>) {
    const eventBus = new EventBus();
    const { tagName = 'div', props, attributes, listeners, children } = data;

    this._meta = {
      tagName,
      props,
      attributes,
      listeners,
      children,
    };

    if (props) {
      this.props = this._makePropsProxy(props);
    }

    if (attributes) {
      this.attributes = attributes;
    }

    if (listeners) {
      this.listeners = listeners;
    }

    if (children) {
      this.propsChildren = children;
    }

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, (props) => {
      this._componentDidUpdate(props as { oldProps: Props; nextProps: Props });
    });
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = this._createDocumentElement(this._meta.tagName);
  }

  private _createDocumentElement(tagName: string): TypeElement {
    return document.createElement(tagName) as TypeElement;
  }

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  dispatchComponentDidUpdate() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  _componentDidMount() {
    this.setAttributes(this.attributes);
    this.setListeners();
    this.addChildren(this.propsChildren);
    this.componentDidMount();
  }

  componentDidMount() {}

  _componentDidUpdate(props: { oldProps: Props; nextProps: Props }) {
    const response = this.componentDidUpdate(props.oldProps, props.nextProps);

    return response;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    const isPropsEqual = isEqual(oldProps, newProps);

    if (!isPropsEqual) {
      this._removeListeners();
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
      this.addChildren(this.children);
      this.setAttributes(this.attributes);
      this.setListeners();
    }
    return isPropsEqual;
  }

  private _render() {
    if (this._element) {
      this._element.innerHTML = this.render();
    } else {
      throw new Error();
    }
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }

    const oldProps = deepCopy(this.props) as Props;
    if (this.props) {
      Object.assign(this.props, nextProps);
    } else {
      this.props = this._makePropsProxy(nextProps);
    }

    this._eventBus().emit(Block.EVENTS.FLOW_CDU, {
      oldProps,
      nextProps: this.props,
    });
  }

  setAttributes(attributes?: Partial<TypeElement>) {
    if (!attributes) {
      return;
    }

    Object.entries(attributes).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        return;
      }

      this._element.setAttribute(key === 'className' ? 'class' : key, value);
      if (!this.attributes) {
        this.attributes = {};
      }
    });

    this.attributes = { ...this.attributes, ...attributes };
  }

  setListeners() {
    if (!this.listeners) {
      return;
    }

    this.listeners.forEach(({ event, callback }) => {
      this.element.addEventListener(event, callback);
    });
  }

  addListener(listener: IListener) {
    this.element.addEventListener(listener.event, listener.callback);
  }

  private _removeListeners() {
    if (!this.listeners) {
      return;
    }

    this.listeners.forEach(({ event, callback }) => {
      this.element.removeEventListener(event, callback);
    });
  }

  updateListener(listener: IListener) {
    if (!this.listeners) {
      return;
    }

    const updatedListener = this.listeners.find(
      (it) => it.event === listener.event,
    );

    if (!updatedListener) {
      return;
    }

    this.element.removeEventListener(
      updatedListener.event,
      updatedListener.callback,
    );

    this.element.addEventListener(updatedListener.event, listener.callback);
  }

  addChildren(children?: Block[]) {
    if (!children) {
      return;
    }

    children.forEach((child) => {
      render(this.getContent(), child);
    });
    this.children = children;
  }

  destroy() {
    this._element.remove();
  }

  render() {
    return '';
  }

  show() {
    const className = this.attributes?.className?.replace('hidden', '');
    this.setAttributes({
      ...this.attributes,
      className,
    } as Partial<TypeElement>);
  }

  hide() {
    this.setAttributes({
      ...this.attributes,
      className: `${this.attributes?.className || ''} hidden`,
    } as Partial<TypeElement>);
  }
}
