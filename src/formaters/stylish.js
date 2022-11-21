import _ from 'lodash';

export default (data) => {
  const replacer = ' ';
  const spacesCount = 2;
  const iter = (curentValue, depth) => {
    if (!_.isObject(curentValue)) {
      return `${curentValue}`;
    }
    const indentSize = depth * spacesCount;
    const curentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(curentValue)
      .map(([key, val]) => {
        if (val.type === 'added') {
          return `${curentIndent}+ ${key}: ${iter(val.value, depth + 2)}`;
        }
        if (val.type === 'deleted') {
          return `${curentIndent}- ${key}: ${iter(val.value, depth + 2)}`;
        }
        if (val.type === 'changed') {
          return `${curentIndent}- ${key}: ${iter(val.value1, depth + 2)}\n${curentIndent}+ ${key}: ${iter(val.value2, depth + 2)}`;
        }
        return `${curentIndent}  ${key}: ${iter(val.value || val, depth + 2)}`;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};
