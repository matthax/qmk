import { get } from './api';

export const KEYBOARDS_ROOT = 'https://keyboards.qmk.fm/v1/';

export type USB = {
  vid: string;
  pid: string;
  device_version: string;
};

export type Key = {
  x: number;
  y: number;
  label?: string;
  w?: number;
  h?: number;
  r?: number;
  rx?: number;
  ry?: number;
  x2?: number;
  y2?: number;
  w2?: number;
  h2?: number;
};

export type Layout = {
  key_count: number;
  layout: Key[];
};

export type Layouts = {
  [name: string]: Layout;
};

export type Keyboard = {
  keyboard_name: string;
  keyboard_folder: string;
  manufacturer?: string;
  maintainer: string;
  url: string;
  usb?: USB;
  layouts: Layouts;
  keymaps: Record<string, unknown>;
  features?: Record<string, boolean>;
  bootloader?: string;
  processor?: string;
  processor_type?: string;
  platform?: string;
  platform_key?: string;
  protocol?: string;
  diode_direction?: string;
  development_board?: string;
  pin_compatible?: string;
  community_layouts?: string[];
  layout_aliases?: Record<string, string>;
  matrix_size?: { cols: number; rows: number };
  parse_errors?: string[];
  parse_warnings?: string[];
};

/**
 * Dictionary of keyboards. T is `Keyboard` when full data is present,
 * `undefined` when only names are available.
 */
export type KeyboardsResponse<T = undefined> = {
  last_updated?: string;
  keyboards: Record<string, T>;
};

export type KeyboardAlias = {
  target: string;
};

export type KeyboardListResponse = {
  last_updated: string;
  keyboards: string[];
  keyboard_aliases?: Record<string, KeyboardAlias>;
};

// Keymap types
export type Layer = string[];
export type Layers = Layer[];
export type Keymap = {
  keyboard: string;
  keymap: string;
  layout: string;
  layers: Layers;
};
export type KeymapResponse = {
  last_updated?: string;
  keyboards: {
    [name: string]: {
      keymaps: {
        [keymap: string]: Keymap;
      };
    };
  };
};

/**
 * Retrieve metadata for a specific keyboard
 * ```typescript
 * const { keyboards } = await keyboard('crkbd/rev1');
 * ```
 */
export const keyboard = (name: string): Promise<KeyboardsResponse<Keyboard>> =>
  get<KeyboardsResponse<Keyboard>>(`${KEYBOARDS_ROOT}keyboards/${encodeURI(name)}/info.json`);

/**
 * Retrieve metadata for all keyboards (~28MB download)
 * ```typescript
 * const { keyboards } = await keyboards();
 * ```
 */
export const keyboards = (): Promise<KeyboardsResponse<Keyboard>> =>
  get<KeyboardsResponse<Keyboard>>(`${KEYBOARDS_ROOT}keyboards.json`);

/**
 * Retrieve the list of all keyboard names and aliases
 * ```typescript
 * const { keyboards } = await names();
 * ```
 */
export const names = (): Promise<KeyboardListResponse> =>
  get<KeyboardListResponse>(`${KEYBOARDS_ROOT}keyboard_list.json`);

/**
 * Get the readme for a keyboard
 * ```typescript
 * const md = await readme('crkbd/rev1');
 * ```
 */
export const readme = (name: string): Promise<string> =>
  get<string>(`${KEYBOARDS_ROOT}keyboards/${encodeURI(name)}/readme.md`, undefined, { Accept: 'text/markdown' });

/**
 * Get keymap data for a keyboard
 * ```typescript
 * const { keyboards } = await keymaps('crkbd/rev1', 'default');
 * ```
 */
export const keymaps = (name: string, keymap: string): Promise<KeymapResponse> =>
  get<KeymapResponse>(`${KEYBOARDS_ROOT}keyboards/${encodeURI(name)}/keymaps/${encodeURI(keymap)}/keymap.json`);

export default keyboard;
