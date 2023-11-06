import './style.css';
import { Button } from './components/button/Button';
import { render } from './utils/render';
import { Input } from './components/input';

// <label class='label {{className}}'>
//   {{label}}
//   <input
//     name='{{name}}'
//     class='input {{className}}'
//     placeholder='{{placeholder}}'
//     value='{{value}}'
//   />
// </label>

const button = new Button({
  props: {
    text: 'avd',
  },
  attributes: {
    className: 'button button--accent',
    id: '1',
    name: 'asd',
  },
  listeners: [
    {
      event: 'click',
      callback: (e) => console.log(e),
    },
  ],
});

const input = new Input({
  props: {
    label: 'asd',
  },
  attributes: {
    className: 'label',
  },
  listeners: [
    {
      event: 'input',
      callback: (e) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value);
      },
    },
  ],
});

render('.app', button);
render('.app', input);

setTimeout(() => {
  button.setProps({
    text: 'Click me, please',
  });
}, 1000);

setTimeout(() => {
  button.setAttributes({ className: 'button button--normal' });
}, 2000);

setTimeout(() => {
  button.updateListener({ event: 'click', callback: () => console.log(2) });
}, 5000);
