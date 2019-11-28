 [![npm][shield-npm]][package] [![CircleCI][shield-circle]](https://circleci.com/gh/matthax/qmk)  [![node][shield-node]][package] [![Discord](https://img.shields.io/discord/440868230475677696?style=flat-square)](https://discord.gg/Uq7gcHh)

 [![CircleCI](https://circleci.com/gh/matthax/qmk.svg?style=svg)](https://circleci.com/gh/matthax/qmk)

# QMK.js

Bring the power of the open source project to your browser or node.js project. Get information on keyboards and layouts and even compile firmware using the [QMK API][qmk-api].


## Installation
Using yarn (recommended):

`yarn add ymk`

Or with npm:

`npm install --save qmk`


## Usage

Get metadata for keyboards using the [QMK Keyboard API][keyboard-api]

```javascript
import QMK from 'qmk';

// Create an API client using the provided version
const client = new QMK('v1');
const keyboardName = 'massdrop/alt';

// Fetch keyboard metadata
client.keyboards(keyboardName).then(({ keyboards }) => {
  // The "keyboards" call always returns a dictionary of keyboards
  // So we keep keyboardName to reference it in the response body
  console.info(keyboards[keyboardName]);
}).catch((err) => {
  console.error(err);
});
```

Get metadata for every supported QMK keyboard using the special `all` keyword

```javascript
import QMK from 'qmk';

// Create an API client using the provided version
const client = new QMK('v1');

// Fetch keyboard metadata
client.keyboards('all').then(({ keyboards }) => {
  console.info(keyboards);
}).catch((err) => {
  console.error(err);
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

[qmk-api]: https://github.com/qmk/qmk_api/
[keyboard-api]: https://github.com/qmk/qmk_api/blob/master/docs/keyboard_api.md
[compiler-api]: https://github.com/qmk/qmk_api/blob/master/docs/api_docs.md
[chat]: 440868230475677697
[package]: https://www.npmjs.com/package/qmk
[shield-npm]: https://img.shields.io/npm/v/qmk?style=flat-square
[shield-node]: https://img.shields.io/node/v/qmk?style=flat-square
[shield-circle]: https://img.shields.io/circleci/build/github/matthax/qmk?style=flat-square
