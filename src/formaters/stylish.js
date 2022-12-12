import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);

const signs = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

export default (data) => {
  const iter = (curentValue, depth) => {
    if (!_.isPlainObject(curentValue)) {
      return `${curentValue}`;
    }
    const bracketIndent = replacer.repeat((depth - 1) * spacesCount);
    const lines = Object
      .entries(curentValue)
      .map(([key, val]) => {
        switch (val.type) {
          case 'added':
          case 'deleted':
          case 'unchanged':
            return `${getIndent(depth)}${signs[val.type]}${key}: ${iter(val.value, depth + 1)}`;
          case 'changed':
            return `${getIndent(depth)}- ${key}: ${iter(val.value1, depth + 1)}\n${getIndent(depth)}+ ${key}: ${iter(val.value2, depth + 1)}`;
          case 'nested':
            return `${getIndent(depth)}  ${key}: ${iter(val.children, depth + 1)}`;
          default:
            return `${getIndent(depth)}  ${key}: ${iter(val.value || val, depth + 1)}`;
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};
