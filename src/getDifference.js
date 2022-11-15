import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const gendiff = (filepath1, filepath2) => {
  const current = process.cwd();
  const data1 = JSON.parse(readFileSync(path.resolve(current, filepath1), 'utf-8'));
  const data2 = JSON.parse(readFileSync(path.resolve(current, filepath2), 'utf-8'));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    } else {
      acc[`  ${key}`] = data1[key];
    }
    return acc;
  }, {});
  return JSON.stringify(result, null, ' ').replaceAll('"', '');
};

export default gendiff;
