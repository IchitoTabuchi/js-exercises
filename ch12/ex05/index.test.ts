/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readLines } from './index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('readLines', () => {
  const testFile = path.join(__dirname, 'test.txt');

  beforeAll(() => {
    fs.writeFileSync(testFile, 'line1\nline2\nline3\nlastline', 'utf8');
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });

  it('reads all lines correctly', () => {
    const lines: string[] = [];
    for (const line of readLines(testFile)) lines.push(line);
    expect(lines).toEqual(['line1', 'line2', 'line3', 'lastline']);
  });

  it('closes the file even if iteration is broken', () => {
    const mockFs = {
      ...fs,
      closeSync: jest.fn(fs.closeSync),
      openSync: fs.openSync,
      readSync: fs.readSync,
    };
    const iter = readLines(testFile, mockFs);
    for (const _ of iter) break;
    expect(mockFs.closeSync).toHaveBeenCalledTimes(1);
  });

  it('closes the file even if iteration throws an error', () => {
    const mockFs = {
      ...fs,
      closeSync: jest.fn(fs.closeSync),
      openSync: fs.openSync,
      readSync: fs.readSync,
    };

    const iter = readLines(testFile, mockFs);

    expect(() => {
      for (const _ of iter) throw new Error('test error');
    }).toThrow('test error');

    expect(mockFs.closeSync).toHaveBeenCalledTimes(1);
  });

  it('handles files with only one line', () => {
    const singleFile = path.join(__dirname, 'single.txt');
    fs.writeFileSync(singleFile, 'onlyline', 'utf8');

    const lines: string[] = [];
    for (const line of readLines(singleFile)) lines.push(line);

    expect(lines).toEqual(['onlyline']);
    fs.unlinkSync(singleFile);
  });
});

// バッファサイズ1024Bを超えるファイルの読み込みもテストする
