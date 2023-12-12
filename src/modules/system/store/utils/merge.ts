import { Indexed } from '@types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge = (lhs: Indexed<any>, rhs: Indexed<any>): Indexed => {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};
