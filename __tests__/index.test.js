import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([
  ['stylish', 'result.stylish.txt'], [undefined, 'result.stylish.txt'],
  ['plain', 'result.plain.txt'], ['json', 'result.json.txt'],
])('format %s', (format, expected) => {
  test.each([
    ['json', 'json'], ['yaml', 'yaml'], ['yml', 'yml'],
  ])('file extension %s', (extension1, extensoin2) => {
    const file1 = getFixturePath(`file1.${extension1}`);
    const file2 = getFixturePath(`file2.${extensoin2}`);
    const result = fs.readFileSync(getFixturePath(expected), 'utf8');
    expect(genDiff(file1, file2, format)).toEqual(result);
  });
});

test('unknown extension', () => {
  expect(() => genDiff('__fixtures__/result.json.txt', '__fixtures__/result.json.txt'))
    .toThrow('unknown extension txt');
});

test('wrong format', () => {
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'wrongFormat'))
    .toThrow('Unknown format - wrongFormat!');
});
