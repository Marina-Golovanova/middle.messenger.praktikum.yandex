import { Block } from '../Block';

export const render = <Props extends object, TypeElement extends HTMLElement>(
  root: Node,
  block: Block<Props, TypeElement>,
) => {
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};
