import { deepCopy } from '../../../utils/deepCopy';
import { isDeepEqual } from '../../../utils/isDeepEqual';
import { EventBus } from '../event-bus';

import type { IComponentProps, IListener } from '../../../types';

type IMeta<Props, Attributes> = {
  tagName: string;
} & IComponentProps<Props, Attributes>;

export abstract class Block<
  Props extends object,
  Attributes extends Partial<HTMLElement>,
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  props?: Props;
  attributes?: Attributes;
  listeners?: IListener[];
  private _eventBus: () => EventBus;

  private _element: HTMLElement = this._createDocumentElement('div');
  private _meta: IMeta<Props, Attributes> = { tagName: 'div' };

  constructor(data: IMeta<Props, Attributes>) {
    const eventBus = new EventBus();
    const { tagName = 'div', props, attributes, listeners } = data;

    this._meta = {
      tagName,
      props,
      attributes,
      listeners,
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

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.setAttributes(this.attributes);
    this.setListeners();
    this.componentDidMount();
  }

  componentDidMount() {}

  _componentDidUpdate(props: { oldProps: Props; nextProps: Props }) {
    const response = this.componentDidUpdate(props.oldProps, props.nextProps);

    return response;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    const isEqual = isDeepEqual(oldProps, newProps);

    if (!isEqual) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return isEqual;
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
      this.props = nextProps;
    }

    this._eventBus().emit(Block.EVENTS.FLOW_CDU, { oldProps, nextProps });
  }

  setAttributes(attributes?: Attributes) {
    if (!attributes) {
      return;
    }

    Object.entries(attributes).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        return;
      }
      this._element.setAttribute(key === 'className' ? 'class' : key, value);
    });
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

  abstract render(): string;
}
