import { compile } from 'handlebars';

export const usersGroupIconTemplate =
  compile(`<svg class='{{className}}' viewBox="0 0 24 24" fill="none">
  <title>{{title}}</title>
  <circle cx="12" cy="9" r="4" fill="currentColor"/>
  <circle cx="17" cy="9" r="3" fill="currentColor"/>
  <circle cx="7" cy="9" r="3" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="currentColor"/>
  <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="currentColor"/>
  </svg>`);