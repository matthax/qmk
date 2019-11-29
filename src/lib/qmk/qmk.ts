import keyboards, { KeyboardsResponse } from './keyboard';

export type API_VERSION = 'v1';

export const API_ROOT = 'https://api.qmk.fm/';

/**
 * QMK API client, specify a version to begin interacting with the API
 * ```typescript
 * const client: QMKClient = new QMKClient('v1');
 * ```
 */
export class QMK {
  url: string;

  constructor(version: API_VERSION) {
    this.url = `${API_ROOT}${version}/`;
  }

  /**
   * Retrieve metadata about keyboards
   * ```typescript
   * const { git_hash, last_updated, keyboards } = await client.keyboards('massdrop/alt');
   * ```
   * @param {...string} names Provide one or more keyboard names, or use the special "all" keyword
   */
  keyboards = (...names: string[]): Promise<KeyboardsResponse> => (
    keyboards(`${this.url}${names.indexOf('all') >= 0 ? 'all' : names.map((name) => encodeURI(name)).join(',')}`)
  );
}
