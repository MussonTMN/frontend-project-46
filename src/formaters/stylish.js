import _ from 'lodash';

export default (data) => {
  const replacer = ' ';
  const spacesCount = 4;
  const iter = (curentValue, depth) => {
    if (!_.isPlainObject(curentValue)) {
      return `${curentValue}`;
    }
    const getIndent = (num) => replacer.repeat(num * spacesCount - 2);
    const bracketIndent = replacer.repeat((depth - 1) * spacesCount);
    const lines = Object
      .entries(curentValue)
      .map(([key, val]) => {
        switch (val.type) {
          case 'added':
            return `${getIndent(depth)}+ ${key}: ${iter(val.value, depth + 1)}`;
          case 'deleted':
            return `${getIndent(depth)}- ${key}: ${iter(val.value, depth + 1)}`;
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
