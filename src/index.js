import path from 'node:path';
import fs from 'fs';
import getDifference from './getDifference.js';
import parse from './parser.js';
import formater from './formaters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (absolutePath) => fs.readFileSync(absolutePath, 'utf8');
const getExtension = (absolutePath) => path.extname(absolutePath);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const data1 = parse(getData(path1), getExtension(path1));
  const data2 = parse(getData(path2), getExtension(path2));
  return formater(getDifference(data1, data2), formatName);
};
