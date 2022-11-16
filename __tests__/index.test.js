import getDifference from '../src/getDifference';

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
