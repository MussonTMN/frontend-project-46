import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff <file1> <file2> format', () => {
  test.each`
    file1Ext   | file2Ext   | format        | expectedResult
    ${'json'}  | ${'json'}  | ${'stylish'}  | ${'result.stylish.txt'}
    ${'yaml'}  | ${'yaml'}  | ${'stylish'}  | ${'result.stylish.txt'}
    ${'yml'}   | ${'yml'}   | ${'stylish'}  | ${'result.stylish.txt'}

    ${'json'}  | ${'json'}  | ${undefined}  | ${'result.stylish.txt'}
    ${'yaml'}  | ${'yaml'}  | ${undefined}  | ${'result.stylish.txt'}
    ${'yml'}   | ${'yml'}   | ${undefined}  | ${'result.stylish.txt'}

    ${'json'}  | ${'json'}  | ${'plain'}    | ${'result.plain.txt'}
    ${'yaml'}  | ${'yaml'}  | ${'plain'}    | ${'result.plain.txt'}
    ${'yml'}   | ${'yml'}   | ${'plain'}    | ${'result.plain.txt'}

    ${'json'}  | ${'json'}  | ${'json'}     | ${'result.json.txt'}
    ${'yaml'}  | ${'yaml'}  | ${'json'}     | ${'result.json.txt'}
    ${'yml'}   | ${'yml'}   | ${'json'}     | ${'result.json.txt'}

    
  `(
    'show a difference($expectedResult) between file1.$file1Ext and file2.$file1Ext with $format',
    (
      {
        file1Ext, file2Ext, format, expectedResult,
      },
    ) => {
      const file1 = getFixturePath(`file1.${file1Ext}`);
      const file2 = getFixturePath(`file2.${file2Ext}`);
      const result = fs.readFileSync(getFixturePath(`${expectedResult}`), 'utf8');
      expect(genDiff(file1, file2, format)).toEqual(result);
    },
  );
});
