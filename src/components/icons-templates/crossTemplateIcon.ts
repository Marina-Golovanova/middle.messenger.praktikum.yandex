import { compile } from 'handlebars';

export const crossTemplateIcon =
  compile(`<svg class='{{className}}' viewBox="0 0 24 24" fill="none">
  <title>{{title}}</title>
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
  <path d="M9.0001 14.9997L15.0001 8.99966" stroke="currentColor" stroke-width="2"/>
  <path d="M15 15L9 9" stroke="currentColor" stroke-width="2"/>
  </svg>`);
