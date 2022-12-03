import _ from 'lodash';

const typeOf = (value) => {
  if (_.isPlainObject(value)) {
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
        const tree = _.trimStart(newKey, '.');
        switch (val.type) {
          case 'added':
            return `Property '${tree}' was added with value: ${typeOf(val.value)}`;
          case 'deleted':
            return `Property '${tree}' was removed`;
          case 'changed':
            return `Property '${tree}' was updated. From ${typeOf(val.value1)} to ${typeOf(val.value2)}`;
          case 'nested':
            return `${iter(val.children, newKey)}`;
          default:
            return [];
        }
      }).join('\n');
    return lines;
  };
  return iter(data, '');
};
