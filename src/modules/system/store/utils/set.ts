import { Indexed } from '@types';
import { merge } from './merge';

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value as any,
  );
  return merge(object as Indexed, result);
};
