import getDifference from '../src/getDifference';
import genDiff from '../src/index.js';

const data1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const data2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('compare flat jsons', () => expect(getDifference(data1, data2)).toBe(result));

test('compare empty jsons', () => expect(getDifference({}, {})).toBe('{\n}'));

test('compare .yamls', () => expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(result));

test('compare .ymls', () => expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(result));
