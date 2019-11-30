import { get } from '../api';

export type Key = {
  y: number;
  x: number;
  label: string;
};
export type Layout = {
  key_count: number;
  layout: Key[];
};
export type Layouts = {
  [name: string]: Layout;
};
export type Keyboard = {
  platform: string;
  width: number;
  manufacturer?: string;
  maintainer: string;
  keymaps: string[];
  vendor_id?: string | number;
  description: string;
  readme: boolean;
  identifier: string;
  bootloader: string;
  layouts: Layouts;
  processor_type: string;
  url: string;
  keyboard_folder: string;
  height: number;
  processor: string;
  device_ver: string;
  product_id?: string | number;
  keyboard_name: string;
};
export type Keyboards = {
  [name: string]: Keyboard;
};
export type KeyboardsResponse = {
  git_hash?: string;
  last_updated: string;
  keyboards: Keyboards;
};
/**
 * Retrieve metadata about keyboards
 * ```typescript
 * const { git_hash, last_updated, keyboards } = await keyboards('https://api.qmk.fm/v1/', 'massdrop/alt');
 * ```
 * @param {string} api The QMK API url
 * @param {...string} names Provide one or more keyboard names, or use the special "all" keyword
 */
export const keyboards = (api: string, ...names: string[]): Promise<KeyboardsResponse> => (
  get<KeyboardsResponse>(`${api}keyboards/${names.indexOf('all') >= 0 ? 'all' : names.map((name) => encodeURI(name)).join(',')}`)
);

/**
 * Get the readme file associated with the keyboard
 * @param api The QMK API endpoint
 * @param name The name of the keyboard
 * ```typescript
 * const altReadme = await readme('https://api.qmk.fm/v1/', 'massdrop/alt');
 * ```
 */
export const readme = (api: string, name: string): Promise<string> => (
  get<string>(`${api}/keyboards/${name}/readme`)
);

export default keyboards;
