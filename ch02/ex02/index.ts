// node --loader ts-node/esm ch02/ex02/index.ts

import _ from 'lodash';

const numbers = [1, 2, 3, 4, 5];
const shuffled = _.shuffle(numbers);
console.log(shuffled);

// 以下は実行するとエラーになるが、コード上での $ の使用例のため残す。

import { JSDOM } from 'jsdom';
import $ from 'jquery';

const { window } = new JSDOM(`<!DOCTYPE html><p>Hello</p>`);

Object.assign(globalThis, { window, document: window.document });

$(document).ready(() => {
  console.log('jQuery is working in Node.js!');
});
