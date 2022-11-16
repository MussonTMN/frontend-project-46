import fs from 'fs';
import path from 'node:path';
import getDifference from './getDifference.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFile = (absolutePath) => fs.readFileSync(absolutePath);

export default (filepath1, filepath2) => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const data1 = JSON.parse(getFile(path1));
  const data2 = JSON.parse(getFile(path2));
  return getDifference(data1, data2);
};
