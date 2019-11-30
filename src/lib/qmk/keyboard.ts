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
// Keymap response types
export type Layer = string[];
export type Layers = Layer[];
export type Keymap = {
  keyboard_name: string;
  keymap_folder: string;
  keymap_name: string;
  layers: Layers;
};
export type Keymaps = {
  [keymap: string]: Keymap;
};
export type KeymapKeyboard = Keyboard & { keymaps: Keymaps };
export type KeymapKeyboards = {
  [name: string]: KeymapKeyboard;
}
export type KeymapResponse = {
  git_hash: string;
  last_updated: string;
  keyboards: KeymapKeyboards;
}


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
  get<string>(`${api}/keyboards/${name}/readme`, undefined, { Accept: 'text/markdown' })
);

/**
 * Get the keymap data associated with the provided keyboard and keymap name
 * @param api The QMK API endpoint
 * @param keyboard The name of the keyboard
 * @param keymap The name of the keymap
 * ```typescript
 * const keyboardName = 'handwired/promethium';
 * const keymapName = 'default';
 * const { keyboards } = await keymaps('https://api.qmk.fm/v1/', keyboardName, keymapName);
 * const keyboard = keyboards[keyboardName]
 * // Get the keymap for the keyboard
 * const { keymaps: { [keymapName]: keymap } } = keyboard;
 * console.info(`${keymap.keyboard_name} has ${keymap.layers.length} layers
 * in the ${keymap.keymap_name} keymap`);
 * ```
 */
export const keymaps = (api: string, keyboard: string, keymap: string): Promise<string> => (
  get<string>(`${api}/keyboards/${keyboard}/keymaps/${keymap}`)
);

export default keyboards;
