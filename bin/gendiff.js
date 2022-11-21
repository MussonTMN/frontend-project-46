#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.6')
  .option('-f, --format <type>', 'output format(stylish)', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => console.log(genDiff(file1, file2, program.opts().format)))
  .parse();
