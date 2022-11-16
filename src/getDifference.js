import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    } if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    } if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });
  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};

export default getDifference;
