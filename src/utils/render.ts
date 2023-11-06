import { Block } from '../modules/system/block';

export const render = <
  Props extends object,
  Attributes extends Partial<HTMLElement>,
>(
  query: string,
  block: Block<Props, Attributes>,
) => {
  const root = document.querySelector(query);

  if (!root) {
    return;
  }

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
};
