import QMK, { Keyboard } from '../../src';

export const keyboardExample = async (): Promise<Keyboard> => {
  // Create an API client using the provided version
  const client = new QMK('v1');
  const keyboardName = 'massdrop/alt';

  // Fetch keyboard metadata
  const { keyboards } = await client.keyboards(keyboardName);
  // The "keyboards" call always returns a dictionary of keyboards
  // So we keep keyboardName to reference it in the response body
  const keyboard: Keyboard = keyboards[keyboardName];
  console.info(`${keyboard.keyboard_name} has ${Object.keys(keyboard.layouts).length} layouts`);
  return keyboard;
};

export const keyboardsExample = async (): Promise<Keyboard[]> => {
  // Create an API client using the provided version
  const client = new QMK('v1');

  // Fetch keyboard metadata
  const { keyboards } = await client.keyboards('all');
  return Object.values(keyboards).map((keyboard) => {
    console.info(`${keyboard.keyboard_name} has ${Object.keys(keyboard.layouts).length} layouts`);
    return keyboard;
  });
};
