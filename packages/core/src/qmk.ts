import {
  Keyboard,
  KeyboardsResponse,
  KeymapResponse,
  keyboard as fetchKeyboard,
  keyboards,
  names as fetchKeyboardList,
  readme as fetchReadme,
  keymaps as fetchKeymaps,
} from './keyboard';
import { firmwareList, FirmwareListResponse } from './firmware';
import usb, { Vendors, Products, KeyboardsMeta } from './usb';

/**
 * QMK API client
 * ```typescript
 * const client = new QMK();
 * ```
 */
export class QMK {
  private _keyboards: Map<string, Keyboard> = new Map();
  private _list: string[] | null = null;

  /**
   * Retrieve metadata for a single keyboard. Cached after first fetch.
   * ```typescript
   * const kb = await client.keyboard('crkbd/rev1');
   * ```
   */
  keyboard = async (name: string): Promise<Keyboard | undefined> => {
    if (!this._keyboards.has(name)) {
      const response = await fetchKeyboard(name);
      const kb = response.keyboards[name];
      if (kb) this._keyboards.set(name, kb);
    }
    return this._keyboards.get(name);
  };

  /**
   * Retrieve keyboard metadata. By default returns a name-only dictionary
   * (`keyboards` values are `undefined`). Pass `detailed: true` to fetch
   * full keyboard objects for every entry (~28MB download). Results are
   * cached after the first fetch.
   * ```typescript
   * const { keyboards } = await client.keyboards();
   * const { keyboards } = await client.keyboards({ detailed: true });
   * ```
   */
  keyboards(options: { detailed: true }): Promise<KeyboardsResponse<Keyboard>>;
  keyboards(options?: { detailed?: false }): Promise<KeyboardsResponse>;
  async keyboards(options: { detailed?: boolean } = {}): Promise<KeyboardsResponse<Keyboard | undefined>> {
    if (options.detailed) {
      const response = await keyboards();
      for (const [name, kb] of Object.entries(response.keyboards)) {
        this._keyboards.set(name, kb);
      }
      this._list = Object.keys(response.keyboards);
      return response;
    }

    if (this._list === null) {
      const { keyboards, last_updated } = await fetchKeyboardList();
      this._list = keyboards;
      return {
        last_updated,
        keyboards: Object.fromEntries(keyboards.map((name) => [name, undefined])),
      };
    }

    return {
      keyboards: Object.fromEntries(this._list.map((name) => [name, undefined])),
    };
  }

  /**
   * Get the readme for a keyboard
   * ```typescript
   * const md = await client.readme('crkbd/rev1');
   * ```
   */
  readme = (name: string): Promise<string> => fetchReadme(name);

  /**
   * Get keymap data for a keyboard
   * ```typescript
   * const { keyboards } = await client.keymaps('crkbd/rev1', 'default');
   * ```
   */
  keymaps = (name: string, keymap: string): Promise<KeymapResponse> =>
    fetchKeymaps(name, keymap);

  /**
   * Retrieve the list of compiled firmware files from the QMK CI server
   * ```typescript
   * const { last_updated, files } = await client.firmware();
   * ```
   */
  firmware = (): Promise<FirmwareListResponse> => firmwareList();

  /**
   * Retrieve keyboard metadata indexed by USB vendor and product ID
   * ```typescript
   * const vendors = await client.usb();
   * ```
   */
  usb = (): Promise<Vendors> => usb('https://api.qmk.fm/v1/');

  /**
   * Retrieve keyboards for a given USB vendor ID
   * ```typescript
   * const products = await client.vendor('0x04D8');
   * ```
   */
  vendor = async (vendor: string): Promise<Products | undefined> => {
    const vendors = await this.usb();
    return vendors[vendor];
  };

  /**
   * Retrieve keyboard metadata by USB vendor and product ID.
   * Returns an object since multiple keyboards can share a product ID.
   * ```typescript
   * const keyboards = await client.product('0x04D8', '0xEED3');
   * ```
   */
  product = async (vendor: string, product: string): Promise<KeyboardsMeta | undefined> => {
    const products = await this.vendor(vendor);
    return products?.[product];
  };
}
