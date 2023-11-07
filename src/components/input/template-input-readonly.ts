import { compile } from 'handlebars';

export const template = compile(`{{label}}
<input
  name='{{name}}'
  class='input {{className}}'
  placeholder='{{placeholder}}'
  value='{{value}}'
  readonly
/>`);
