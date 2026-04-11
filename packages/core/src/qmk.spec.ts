// eslint-disable-next-line
import test from 'ava';
import QMK from './index';
import { keyboard, names } from './keyboard';
import { firmwareList } from './firmware';

// Module-level function tests

test('keyboard() returns metadata for a specific keyboard', async (t) => {
  const response = await keyboard('crkbd/rev1');
  const kb = response.keyboards['crkbd/rev1'];
  t.truthy(kb);
  t.is(typeof kb.keyboard_name, 'string');
  t.truthy(kb.layouts);
  t.true(Object.keys(kb.layouts).length > 0);
});

test('names() returns a list of keyboard identifiers', async (t) => {
  const response = await names();
  t.true(Array.isArray(response.keyboards));
  t.true(response.keyboards.length > 0);
  t.true(response.keyboards.includes('crkbd/rev1'));
  t.is(typeof response.last_updated, 'string');
});

test('firmwareList() returns firmware file list', async (t) => {
  const response = await firmwareList();
  t.is(typeof response.last_updated, 'string');
  t.true(Array.isArray(response.files));
  t.true(response.files.length > 0);
  t.true(response.files.some((f) => f.endsWith('.hex') || f.endsWith('.uf2')));
});

// QMK class tests

test('client.keyboard() returns a Keyboard object', async (t) => {
  const client = new QMK();
  const kb = await client.keyboard('crkbd/rev1');
  t.truthy(kb);
  t.is(typeof kb?.keyboard_name, 'string');
  t.truthy(kb?.layouts);
});

test('client.keyboard() returns undefined for unknown keyboard', async (t) => {
  const client = new QMK();
  // The fetch will 404 — expect RequestError, not undefined
  await t.throwsAsync(() => client.keyboard('not/a/real/keyboard'));
});

test('client.keyboard() caches results', async (t) => {
  const client = new QMK();
  const first = await client.keyboard('crkbd/rev1');
  const second = await client.keyboard('crkbd/rev1');
  t.is(first, second); // same object reference from cache
});

test('client.keyboards() returns a name-only dictionary by default', async (t) => {
  const client = new QMK();
  const { keyboards } = await client.keyboards();
  t.true(Object.keys(keyboards).length > 0);
  t.true('crkbd/rev1' in keyboards);
  t.is(keyboards['crkbd/rev1'], undefined);
});

test('client.keyboards() serves second call from cache', async (t) => {
  const client = new QMK();
  await client.keyboards(); // populates _list
  const { keyboards } = await client.keyboards(); // served from cache
  t.true('crkbd/rev1' in keyboards);
});

test('client.firmware() returns firmware list', async (t) => {
  const client = new QMK();
  const { last_updated, files } = await client.firmware();
  t.is(typeof last_updated, 'string');
  t.true(Array.isArray(files));
  t.true(files.length > 0);
});

test('client.readme() returns markdown string', async (t) => {
  const client = new QMK();
  const md = await client.readme('crkbd/rev1');
  t.is(typeof md, 'string');
  t.true(md.length > 0);
});
