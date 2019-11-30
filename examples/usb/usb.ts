import QMK, { Vendors, Products, KeyboardMeta } from '../../src';

export const vendorsExample = (): Promise<Vendors> => {
  // Create an API client using the provided version
  const client = new QMK('v1');

  // Fetch keyboard metadata
  return client.usb().then((vendors) => {
    const vendorIDs = Object.keys(vendors);
    console.info(`Retreived ${vendorIDs.length} vendors`);
    return vendors;
  });
};

export const vendorExample = async (): Promise<Products> => {
  // Create an API client using the provided version
  const client = new QMK('v1');

  const vendor = '0x04D8'; // Massdrop
  const massdropKeyboards = await client.vendor(vendor);
  if (!massdropKeyboards) {
    throw new Error(`The vendor ${vendor} was not found!`);
  }
  console.info(massdropKeyboards);
  return massdropKeyboards;
};

export const keyboardsMetadata = async (): Promise<KeyboardMeta[]> => {
  const client = new QMK('v1');
  const vendor = '0x04D8'; // Massdrop
  const product = '0xEED3'; // Alt
  const keyboards = await client.product(vendor, product);
  if (!keyboards) {
    throw new Error(`The vendor ${vendor} does not exist, or there are no products with the ID ${product}`);
  }
  console.info(keyboards);
  return Object.values(keyboards);
};
