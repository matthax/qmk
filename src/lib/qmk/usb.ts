import { get } from '../api';

export type KeyboardMeta = {
  product_id: string;
  vendor_id: string;
  description: string | boolean;
  keyboard: string;
  manufacturer: string;
};

export type Products = {
  [productID: string]: {
    [keyboard: string]: KeyboardMeta;
  };
};

export type Vendors = {
  [vendorID: string]: Products;
};

/**
 * Retrieve keyboard metadata by vendor and product ID
 * ```typescript
 * const vendor = '0x04D8';
 * const { [vendor]: massdrop } = await usb('https://api.qmk.fm/v1/');
 * console.info(massdrop);
 * ```
 * @param {string} api The QMK API url
 */
export const usb = (api: string): Promise<Vendors> => (
  get<Vendors>(`${api}usb`)
);

export default usb;
