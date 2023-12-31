import { compile } from 'handlebars';

export const burgerMenuIconTemplate =
  compile(`<svg class='{{className}}' viewBox='0 0 3 16' fill='none'>
  <title>{{title}}</title>
  <circle cx='1.5' cy='2' r='1.5' fill='currentColor' />
  <circle cx='1.5' cy='8' r='1.5' fill='currentColor' />
  <circle cx='1.5' cy='14' r='1.5' fill='currentColor' />
</svg>`);
