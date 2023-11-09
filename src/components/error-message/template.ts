import { compile } from 'handlebars';

export const template = compile(`
<div class='error__number'>{{errorNumber}}</div>
<div class='error__message'>{{errorMessage}}</div>
`);
