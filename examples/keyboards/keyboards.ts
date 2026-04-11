/* eslint-disable no-console */
import QMK, { Keyboard } from '../../src';

// Fetch a single keyboard by name
export const keyboardExample = async (): Promise<Keyboard | undefined> => {
  const client = new QMK();
  const kb = await client.keyboard('drop/alt/v2');
  if (kb) {
    console.info(`${kb.keyboard_name} has ${Object.keys(kb.layouts).length} layouts`);
  }
  return kb;
};

// Fetch just the list of keyboard names (fast, ~77KB)
export const keyboardNamesExample = async (): Promise<string[]> => {
  const client = new QMK();
  const { keyboards } = await client.keyboards();
  const names = Object.keys(keyboards);
  console.info(`${names.length} keyboards available`);
  return names;
};

// Fetch all keyboards with full metadata (~28MB)
export const keyboardsDetailedExample = async (): Promise<Keyboard[]> => {
  const client = new QMK();
  const { keyboards } = await client.keyboards({ detailed: true });
  return Object.values(keyboards).map((kb) => {
    console.info(`${kb.keyboard_name} has ${Object.keys(kb.layouts).length} layouts`);
    return kb;
  });
};
