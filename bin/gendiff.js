#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import gendiff from '../src/getDifference.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(JSON.parse(readFileSync('package.json')).version)
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')
  .action((file1, file2) => console.log(gendiff(file1, file2)))
  .parse();
