# helpers-hbs [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install helpers-hbs](https://nodei.co/npm/helpers-hbs.png?compact=true)](https://npmjs.org/package/helpers-hbs/)

Several useful helpers to use with handlebars.

## Usage

```js
// Load handlebars
const hbs = require('handlebars');
// Register all helpers.
require('helpers-hbs')(hbs);
```

Also, you can register manually only needed helpers.
