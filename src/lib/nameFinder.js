export const nameFinder = (obj, depth, arr) => {
  return Object.keys(obj).find(objName => {
    if (depth === 0) {
      return nameFinder(obj[objName], depth + 1, arr);
    } else {
      if (arr.length - 1 < depth - 1) return false;
      if (objName === arr[depth - 1]) {
        if (depth === 2) return true;
        else return nameFinder(obj[objName], depth + 1, arr);
      } else {
        return false;
      }
    }
  });
};
