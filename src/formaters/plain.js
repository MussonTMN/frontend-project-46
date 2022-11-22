import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (data) => {
  const iter = (curentValue, ancestry) => {
    const lines = Object
      .entries(curentValue)
      .flatMap(([key, val]) => {
        const newKey = `${ancestry}.${key}`;
        if (val.type === 'added') {
          return `Property '${_.trimStart(newKey, '.')}' was added with value: ${checkValue(val.value)}`;
        }
        if (val.type === 'deleted') {
          return `Property '${_.trimStart(newKey, '.')}' was removed`;
        }
        if (val.type === 'nested') {
          return `${iter(val.value, newKey)}`;
        }
        return val.type === 'changed' ? `Property '${_.trimStart(newKey, '.')}' was updated. From ${checkValue(val.value1)} to ${checkValue(val.value2)}` : [];
      }).join('\n');
    return lines;
  };
  return iter(data, '');
};
