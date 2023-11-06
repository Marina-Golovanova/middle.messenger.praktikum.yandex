type ICallback = <T>(arg: T) => void;
type IListeners = Record<string, ICallback[]>;

export class EventBus {
  private listeners: IListeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: ICallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: ICallback) {
    if (!this.listeners[event]) {
      throw new Error(`${event} doesn't exist`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit<T>(event: string, arg?: T) {
    if (!this.listeners[event]) {
      throw new Error(`${event} doesn't exist`);
    }

    this.listeners[event].forEach((listener) => {
      listener(arg);
    });
  }
}
