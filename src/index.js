import path from 'node:path';
import getDifference from './getDifference.js';
import parse from './parser.js';
import stylish from './formaters/stylish.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default (filepath1, filepath2) => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const data1 = parse(path1);
  const data2 = parse(path2);
  return stylish(getDifference(data1, data2));
};
