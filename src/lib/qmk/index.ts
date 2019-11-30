export * from './qmk';
export * from './keyboard';
export * from './usb';
/**
 * Convert a numeric vendor or product ID to a hex representation used by QMK
 * @param n A numeric vendor ID or product ID
 * @returns Hex string in the format 0x0000
 */
export const hex = (n: number): string => (
  `0x${n.toString(16).toUpperCase().padStart(4, '0')}`
);
