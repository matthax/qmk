export * from './keyboard';
export * from './firmware';
export * from './usb';
export * from './qmk';
export { RequestError } from './api';

/**
 * Convert a numeric vendor or product ID to the hex string format used by QMK
 * @param n A numeric vendor ID or product ID
 * @returns Hex string in the format 0x0000
 */
export const hex = (n: number): string => (
  `0x${n.toString(16).toUpperCase().padStart(4, '0')}`
);

import { QMK } from './qmk';
export default QMK;
