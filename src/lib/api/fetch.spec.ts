// eslint-disable-next-line
import test from 'ava';
import { post, get, RequestError } from './fetch';
const HTTP_BIN = 'https://httpbin.org/';
const api = (endpoint) => `${HTTP_BIN}${endpoint}`;
const simpleData = {
    debug: 'true',
    list: ['1', '2', '3'],
};
test('simple json get', (t) => (get(api('get'), simpleData).then((responseData) => {
    t.deepEqual(responseData.args, simpleData);
})));
test('simple json post', (t) => (post(api('post'), simpleData).then((responseData) => {
    t.deepEqual(responseData.json, simpleData);
})));
test('4xx response code', async (t) => {
    await t.throwsAsync(get(`${api('status')}/400`), {
        instanceOf: RequestError,
    });
});
test('5xx response code', async (t) => {
    await t.throwsAsync(get(`${api('status')}/500`), {
        instanceOf: RequestError,
    });
});
