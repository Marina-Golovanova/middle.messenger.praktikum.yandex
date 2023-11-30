import { Block } from '../Block';

export const render = <Props extends object, TypeElement extends HTMLElement>(
  root: Node,
  block: Block<Props, TypeElement>,
  addToTop?: boolean,
) => {
  if (addToTop) {
    root.insertBefore(block.getContent(), root.firstChild);
  } else {
    root.appendChild(block.getContent());
  }

  block.dispatchComponentDidMount();

  return root;
};
