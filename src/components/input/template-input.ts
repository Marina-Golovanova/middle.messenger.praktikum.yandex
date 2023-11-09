import { compile } from 'handlebars';

export const template = compile(`{{label}}
<input
  name='{{name}}'
  class='input {{className}} {{#if errorMessage}}input--error{{/if}}'
  placeholder='{{placeholder}}'
  value='{{value}}'
  type='{{type}}'
/>
{{#if errorMessage}}<div class='input-error-message'>{{errorMessage}}</div>{{/if}}
`);
