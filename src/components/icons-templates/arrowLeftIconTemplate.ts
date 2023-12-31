import { compile } from 'handlebars';

export const arrowLeftIconTemplate =
  compile(`<svg class='{{className}}' viewBox='0 0 28 28' fill='none'>
<title>{{title}}</title>
<circle
  cx='14'
  cy='14'
  r='14'
  transform='rotate(-180 14 14)'
  fill='currentColor'
/>
<rect
  x='20'
  y='14.8'
  width='11'
  height='1.6'
  transform='rotate(-180 20 14.8)'
  fill='white'
/>
<path d='M13 19L9 14L13 9' stroke='white' stroke-width='1.6' />
</svg>`);
