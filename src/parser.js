import yaml from 'js-yaml';
import fs from 'fs';
import path from 'node:path';

const getFile = (absolutePath) => fs.readFileSync(absolutePath, 'utf8');
const getFormat = (absolutePath) => path.extname(absolutePath);

const parse = (absolutePath) => {
  const format = getFormat(absolutePath);
  let result = '{unknown extension}';
  if (format === '.json') {
    result = JSON.parse(getFile(absolutePath));
  } else if (format === '.yaml' || format === '.yml') {
    result = yaml.load(getFile(absolutePath)) !== undefined ? yaml.load(getFile(absolutePath)) : {};
  }
  return result;
};

export default parse;
