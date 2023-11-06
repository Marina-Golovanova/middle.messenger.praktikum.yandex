export const isDeepEqual = (a: object, b: object): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
