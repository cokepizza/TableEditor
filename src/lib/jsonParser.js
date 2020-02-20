const jsonParser = value => {
  if (Array.isArray(value)) {
    return value.reduce((acc, cur) => {
      const res = jsonParser(cur);
      return {
        ...acc,
        ...res
      };
    }, {});
  } else if (typeof value === 'object') {
    const nameKey = Object.keys(value).find(key => key.indexOf('Name') >= 0);
    // const idKey = Object.keys(value).find(key => key.indexOf('Id') >= 0);
    // const key = `${value[nameKey]}.${value[idKey]}`;
    const arrayKey = Object.keys(value).find(key => Array.isArray(value[key]));

    const key = value[nameKey];
    return { [key]: jsonParser(value[arrayKey]) };
  }
};

export default jsonParser;
