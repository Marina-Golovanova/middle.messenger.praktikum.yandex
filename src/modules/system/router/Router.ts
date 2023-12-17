import { paths } from '@app-router/paths';
import { Block } from '../block';
import { Route } from './Route';

export class Router {
  static __instance: Router;
  history: History = window.history;
  routes: Route[] = [];
  _currentRoute: Route | null = null;
  _rootQuery?: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    if (!this._rootQuery) {
      return;
    }

    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (!event.currentTarget) {
        return;
      }

      const target = event.currentTarget as unknown as {
        location: { pathname: string };
      };

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    if (!Object.values(paths).includes(pathname)) {
      this.history.pushState({}, '', paths.notFound);
      this._onRoute(paths.notFound);

      return;
    }

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this.history.back();
  }

  forward() {
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
