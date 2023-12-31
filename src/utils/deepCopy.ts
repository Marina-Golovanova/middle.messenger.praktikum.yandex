import { Block } from '@modules/system/block';

export const deepCopy = <T>(obj: T) => {
  if (obj instanceof Block || typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy: unknown[] = [];
    obj.forEach((it) => {
      copy.push(deepCopy(it));
    });

    return copy;
  }

  const copy: Record<string, unknown> = {};
  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
};
