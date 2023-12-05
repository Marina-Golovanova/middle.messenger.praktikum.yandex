export const snakeCaseToCamelCase = (value: string) => {
  let newString = '';
  let i = 0;

  while (i < value.length) {
    if (value[i] === '_') {
      newString += value[i + 1].toUpperCase();
      i += 2;
    } else {
      newString += value[i];
      i += 1;
    }
  }

  return newString;
};
