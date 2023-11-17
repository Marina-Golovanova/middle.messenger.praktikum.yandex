import { compile } from 'handlebars';

export const watchedIconTemplate =
  compile(`<svg class='{{className}}' viewBox='0 0 10 5' fill='none'>
  <title>{{title}}</title>
  <line
    y1='-0.5'
    x2='3.765'
    y2='-0.5'
    transform='matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)'
    stroke='currentColor'
  />
  <line
    y1='-0.5'
    x2='5.6475'
    y2='-0.5'
    transform='matrix(0.705933 -0.708278 0.705933 0.708278 3.35815 5)'
    stroke='currentColor'
  />
  <line
    y1='-0.5'
    x2='5.6475'
    y2='-0.5'
    transform='matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)'
    stroke='currentColor'
  />
</svg>`);
