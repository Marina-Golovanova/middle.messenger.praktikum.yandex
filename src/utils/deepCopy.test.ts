import { should } from 'chai';
import { deepCopy } from './deepCopy';

describe('Typescript + Babel usage suite', () => {
  it('should return deep copy of object', () => {
    should().equal(deepCopy({ a: 2 }), { a: 2 });
  });
});
