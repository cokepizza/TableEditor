export const filter = ({ filterRule, target, include }) =>
  Object.keys(target)
    .filter(key => (include ? filterRule.has(key) : !filterRule.has(key)))
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: target[cur]
      }),
      {}
    );
