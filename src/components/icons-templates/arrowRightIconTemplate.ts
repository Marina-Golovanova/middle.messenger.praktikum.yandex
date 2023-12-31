import { compile } from 'handlebars';

export const arrowRightIconTemplate =
  compile(`<svg class='{{className}}' viewBox='0 0 28 28' fill='none'>
  <title>{{title}}</title>
  <circle cx='14' cy='14' r='14' fill='currentColor' />
  <rect x='8' y='13.2' width='11' height='1.6' fill='white' />
  <path d='M15 9L19 14L15 19' stroke='white' stroke-width='1.6' />
</svg>`);
