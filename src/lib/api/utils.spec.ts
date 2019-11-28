// eslint-disable-next-line
import test from 'ava';
import { serializeQueryParam, serialize, getURI } from './utils';

test('serialize query string', (t) => {
  t.is(serializeQueryParam(['encoded', ',']), 'encoded=%2C');
});

test('serialize query boolean', (t) => {
  t.is(serializeQueryParam(['boolean', true]), 'boolean=true');
});

test('serialize query number', (t) => {
  t.is(serializeQueryParam(['number', 3]), 'number=3');
});

test('serialize query boolean[]', (t) => {
  t.is(serializeQueryParam(['boolean.array', [true, false, true]]), 'boolean.array=true&boolean.array=false&boolean.array=true');
});

test('serialize query number[]', (t) => {
  t.is(serializeQueryParam(['number.array', [1, 3, 5]]), 'number.array=1&number.array=3&number.array=5');
});

test('serialize query string[]', (t) => {
  t.is(serializeQueryParam(['string.array', ['testing', '[']]), 'string.array=testing&string.array=%5B');
});

test('no query params', (t) => {
  t.is(getURI('https://api.qmk.fm/v1/'), 'https://api.qmk.fm/v1/');
});

test('simple query params', (t) => {
  t.is(getURI('https://api.qmk.fm/v1/', { test: 'testing' }), 'https://api.qmk.fm/v1/?test=testing');
});

test('complex query params', (t) => {
  t.is(getURI('https://api.qmk.fm/v1/', {
    test: 'testing',
    numbers: [1, 2, 3],
    debug: true,
  }), 'https://api.qmk.fm/v1/?test=testing&numbers=1&numbers=2&numbers=3&debug=true');
});

test('serialize simple data', (t) => {
  t.is(serialize({ data: 'keyboards' }), '{"data":"keyboards"}');
});

test('serialize undefined data', (t) => {
  t.is(typeof serialize(undefined), typeof undefined);
});

test.todo('Support FormData and test it here');
