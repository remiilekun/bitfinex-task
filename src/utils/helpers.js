export const convertArrayToObject = (array) => {
  return array.reduce((obj, item) => {
    const itemId = item[0];
    obj[itemId] = item;
    return obj;
  }, {});
};
