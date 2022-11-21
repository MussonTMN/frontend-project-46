import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    default:
      return stylish(data);
  }
};
