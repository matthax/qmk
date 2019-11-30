// eslint-disable-next-line
import test from 'ava';
import fetchPonyfill from 'fetch-ponyfill';
import { post, get, RequestError } from './fetch';

const { Request, Response } = fetchPonyfill();
const HTTP_BIN = 'https://httpbin.org/';
const api = (endpoint: string): string => `${HTTP_BIN}${endpoint}`;

type SimpleData = {
  debug: 'true' | 'false';
  list: string[] | number[];
}

type SimpleGetResponse = {
  args: SimpleData;
}

type SimplePostResponse = {
  json: SimpleData;
}

const simpleData: SimpleData = {
  debug: 'true',
  list: ['1', '2', '3'],
};

test('simple json get', (t) => (
  get<SimpleGetResponse>(api('get'), simpleData).then((responseData) => {
    t.deepEqual(responseData.args, simpleData);
  })
));

test('simple json post', (t) => (
  post<SimplePostResponse>(api('post'), simpleData).then((responseData) => {
    t.deepEqual(responseData.json, simpleData);
  })
));

test('simple text get', (t) => (
  get<string>(api('robots.txt'), undefined, { Accept: 'text/plain' }).then((responseText) => {
    t.is(responseText, 'User-agent: *\nDisallow: /deny\n');
  })
));

test('4xx response code', async (t) => {
  await t.throwsAsync(get(`${api('status')}/400`), {
    instanceOf: RequestError,
    message: '400: BAD REQUEST at https://httpbin.org/status/400',
  });
});

test('5xx response code', async (t) => {
  await t.throwsAsync(get(`${api('status')}/500`), {
    instanceOf: RequestError,
  });
});

test('Default RequestError message', (t) => {
  t.is(
    new RequestError(
      'http://google.com',
      new Response('', { status: 400, statusText: 'Oopsie!' }),
    ).message,
    '400: Oopsie! at http://google.com',
  );
});

test('Custom RequestError message', (t) => {
  t.is(new RequestError('http://google.com', new Response(), 'Custom Message').message, 'Custom Message');
});

test('Custom RequestError message using RequestInfo', (t) => {
  t.is(new RequestError(new Request('http://google.com', { method: 'GET' }), new Response(), 'Test message').message, 'Test message');
});
