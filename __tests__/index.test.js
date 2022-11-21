import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import getDifference from '../src/getDifference';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf8');

test('compare .yamls', () => expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(result));

test('compare .ymls', () => expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(result));

test('compare .json', () => expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(result));

test('compare empty .yamls', () => expect(genDiff(getFixturePath('empty1.yaml'), getFixturePath('empty2.yml'))).toBe('{\n}'));
