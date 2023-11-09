import { Block } from '../Block';

export const render = <
  Props extends object,
  Attributes extends Partial<HTMLElement>,
>(
  root: Node,
  block: Block<Props, Attributes>,
) => {
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};
