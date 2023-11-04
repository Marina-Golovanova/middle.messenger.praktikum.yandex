import './style.css';
import { EventBus } from './modules/system/event-bus/EventBus';

const eventBus = new EventBus();
const callback = (...args: unknown[]) => {
  console.log('Event emitted', args);
};

eventBus.on('myEvent', callback);
eventBus.emit<string[]>('myEvent', ['some', 'data', 'to', 'process']);
