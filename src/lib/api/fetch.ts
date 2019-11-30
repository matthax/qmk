import fetchPonyfill from 'fetch-ponyfill';
import {
  serialize,
  getURI,
  QueryParams,
  PostData,
} from './utils';

const { fetch, Request, Headers } = fetchPonyfill({ Promise });


export declare type RequestMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

const getDefaultHeaders = (method: RequestMethod): HeadersInit => {
  switch (method) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return { 'Content-Type': 'application/json', Accept: 'application/json' };
    default:
      return { Accept: 'application/json' };
  }
};

export class RequestError extends Error {
  request: RequestInfo;

  response: Response;

  constructor(request: RequestInfo, response: Response, message?: string) {
    super(message || `${response.status}: ${response.statusText} at ${typeof request === 'string' ? request : request.url}`);
    this.name = 'RequestError';
    this.request = request;
    this.response = response;
  }
}
/**
 * Simple wrapper around fetch. If the response code is OK .json() is called on the response.
 * Otherwise a {@link RequestError} will be raised
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @param {RequestInfo} r The {@link RequestInfo} passed to fetch
 */
const fetchData = <T>(r: RequestInfo): Promise<T> => (
  fetch(r).then((response: Response) => {
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      const json = contentType && contentType.indexOf('application/json') >= 0;
      // text/markdown text/html text/plain should all be treated as text
      return json ? response.json() : response.text();
    }
    throw new RequestError(r, response);
  })
);
/**
 * Issue a simple get request and return JSON content
 * @param {string} uri The URI the GET request will be sent to
 * @param {QueryParams} query Optional query params object
 */
export const get = <T>(uri: string, query?: QueryParams, headers?: HeadersInit): Promise<T> => (
  fetchData<T>(
    new Request(getURI(uri, query), {
      method: 'GET',
      headers: new Headers(headers || getDefaultHeaders('GET')),
    }),
  )
);
/**
 * Issue a post request and return the deserialized json response content
 * @param {string} uri The URI the POST request will be sent to
 * @param {PostData} data Optional {@link PostData} sent to the URI as JSON content
 * @param {QueryParams} query Optional query parameters added to the provided URI
 */
export const post = <T>(
  uri: string,
  data?: PostData,
  query?: QueryParams,
  headers?: HeadersInit,
): Promise<T> => (
    fetchData<T>(
      new Request(getURI(uri, query), {
        method: 'POST',
        headers: new Headers(headers || getDefaultHeaders('POST')),
        body: serialize(data),
      }),
    )
  );
