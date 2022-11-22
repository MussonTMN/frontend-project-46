import yaml from 'js-yaml';
import fs from 'fs';
import path from 'node:path';

const getFile = (absolutePath) => fs.readFileSync(absolutePath, 'utf8');
const getFormat = (absolutePath) => path.extname(absolutePath);

const parse = (absolutePath) => {
  const format = getFormat(absolutePath);
  switch (format) {
    case '.json':
      return JSON.parse(getFile(absolutePath));
    case '.yaml':
    case '.yml':
      return yaml.load(getFile(absolutePath)) !== undefined ? yaml.load(getFile(absolutePath)) : {};
    default:
      return {};
  }
};

export default parse;
