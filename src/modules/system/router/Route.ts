import { render } from '@utils/render';
import { Block } from '../block';

export type IRouteProps = {
  rootQuery: string;
};

export class Route {
  _pathname?: string;
  _blockClass: Block;
  _block: Block | null;
  _props: IRouteProps;

  constructor(pathname: string, view: Block, props: IRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      // npppt
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
