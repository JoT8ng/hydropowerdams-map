// @ts-nocheck
export const reverseObj = (obj: object) => {
  return Object.keys(obj)
    .reverse()
    .reduce((a, key) => {
      a[key] = obj[key];
      return a;
    }, {});
};
