import { Block } from '@modules/system/block';

export const render = <Props extends object, TypeElement extends HTMLElement>(
  query: string,
  block: Block<Props, TypeElement>,
) => {
  const root = document.querySelector(query);

  if (!root) {
    return;
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};
