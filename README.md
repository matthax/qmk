# QMK.js

[![npm][shield-npm]][package] [![node][shield-node]][package]

JavaScript/TypeScript bindings for the [QMK API][qmk-api]. Fetch keyboard metadata, layouts, firmware, and more from the browser or Node.js.

## Packages

| Package | Description |
| --- | --- |
| [`@qmk/core`](packages/core) | Browser-safe keyboard and firmware fetching |
| [`@qmk/node`](packages/node) | (Active Development) Node/Electron extensions (filesystem, USB HID in progress) |

## Installation

```sh
bun add @qmk/core
# or
npm install @qmk/core
```

## Usage

### Single keyboard

```typescript
import QMK from '@qmk/core';

const client = new QMK();
const kb = await client.keyboard('crkbd/rev1');
console.info(kb?.keyboard_name, kb?.layouts);
```

### List all keyboard names

Returns a lightweight name-only dictionary (~77KB). Values are `undefined`, use this to check what's available without fetching all the metadata.

```typescript
const { keyboards } = await client.keyboards();
const names = Object.keys(keyboards);
console.info(`${names.length} keyboards available`);
```

### Full keyboard metadata

Fetches all keyboards with complete metadata (~28MB).

```typescript
const { keyboards } = await client.keyboards({ detailed: true });
for (const kb of Object.values(keyboards)) {
  console.info(`${kb.keyboard_name}: ${Object.keys(kb.layouts).length} layouts`);
}
```

### Firmware list

```typescript
const { last_updated, files } = await client.firmware();
console.info(`${files.length} firmware files as of ${last_updated}`);
```

### Readme and keymaps

```typescript
const md = await client.readme('crkbd/rev1');
const { keyboards } = await client.keymaps('crkbd/rev1', 'default');
```

### USB vendor/product lookup

```typescript
const vendors = await client.usb();
const massdrop = await client.vendor('0x04D8');
const alt = await client.product('0x04D8', '0xEED3');
```

## API

All methods are on the `QMK` class and cache results after the first fetch.

| Method | Returns | Description |
| --- | --- | --- |
| `keyboard(name)` | `Keyboard \| undefined` | Full metadata for one keyboard |
| `keyboards()` | `KeyboardsResponse` | Name-only dictionary |
| `keyboards({ detailed: true })` | `KeyboardsResponse<Keyboard>` | Full metadata for all keyboards |
| `readme(name)` | `string` | Keyboard readme as markdown |
| `keymaps(name, keymap)` | `KeymapResponse` | Keymap layer data |
| `firmware()` | `FirmwareListResponse` | List of compiled firmware files |
| `usb()` | `Vendors` | USB vendor/product index |
| `vendor(vid)` | `Products \| undefined` | All products for a vendor ID |
| `product(vid, pid)` | `KeyboardsMeta \| undefined` | Keyboards matching a vendor + product ID |

## Contributing

Pull requests are welcome. For major changes please open an issue first.

Run tests:

```sh
bun run --filter '@qmk/core' test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

[qmk-api]: https://docs.qmk.fm/api_docs
[package]: https://www.npmjs.com/package/@qmk/core
[shield-npm]: https://img.shields.io/npm/v/@qmk/core?style=flat-square
[shield-node]: https://img.shields.io/node/v/@qmk/core?style=flat-square
