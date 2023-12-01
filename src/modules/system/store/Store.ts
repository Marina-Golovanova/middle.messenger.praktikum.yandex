/* eslint-disable @typescript-eslint/no-explicit-any */
import { Indexed } from '@types';
import { EventBus } from '../event-bus';
import { set } from './utils/set';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};
  static _instance: Store;
  static storeName = 'store';

  constructor() {
    if (Store._instance) {
      return Store._instance;
    }

    super();

    const savedState = localStorage.getItem(Store.storeName);
    this.state = savedState ? JSON.parse(savedState) : {};

    Store._instance = this;

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.storeName, JSON.stringify(this.state));
    });
  }

  public getState() {
    return this.state;
  }

  public removeState() {
    this.state = {};
    localStorage.setItem(Store.storeName, JSON.stringify({}));
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
