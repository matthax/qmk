export const API_ROOT = "https://api.qmk.fm/";
export type API_VERSION = 'v1';
export type Keymap = string;
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
