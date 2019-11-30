import keyboards, { KeyboardsResponse } from './keyboard';
import usb, { Vendors, Products, KeyboardsMeta } from './usb';

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

  /**
   * Retrieve keyboard metadata by vendor and product ID
   * ```typescript
   * const vendor = '0x04D8';
   * const { [vendor]: massdrop } = await client.usb('https://api.qmk.fm/');
   * console.info(massdrop);
   * ```
   */
  usb = async (): Promise<Vendors> => (
    usb(this.url)
  );

  /**
   * Retrieve keyboard metadata by vendor ID
   * ```typescript
   * const vendor = '0x04D8'; // Massdrop
   * const massdropKeyboards = await client.vendor(vendor);
   * console.info(massdropKeyboards);
   * ```
   */
  vendor = async (vendor: string): Promise<Products | undefined> => {
    const vendors = await this.usb();
    return vendors[vendor];
  };

  /**
   * Retrieve keyboard metadata by product ID.
   * Product IDs can be shared among multiple keyboards.
   * As a result, an object will always be returned from this function,
   * even if there's only one matching keyboard
   * ```typescript
   * const vendor = '0x04D8'; // Massdrop
   * const product = '0xEED3'; // Alt
   * const keyboards = await client.product(vendor, product);
   * console.info(keyboards);
   * ```
   */
  product = async (vendor: string, product: string): Promise<KeyboardsMeta | undefined> => {
    const products = await this.vendor(vendor);
    return products ? products[product] : undefined;
  };
}
