# pad-values [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install pad-values](https://nodei.co/npm/pad-values.png?compact=true)](https://npmjs.org/package/pad-values/)

Pad each value in array.

## Examples

Code:

```js
const data      = {
    'Enero'      : '1,23€',
    'Febrero'    : '25,54€',
    'Marzo'      : '2,69€',
    'Abril'      : '123,45€',
    'Mayo'       : '95,12€',
    'Junio'      : '856,46€',
    'Julio'      : '568,45€',
    'Agosto'     : '0,05€',
    'Septiembre' : '9,85€',
    'Octubre'    : '15,69€',
    'Noviembre'  : '1,49€',
    'Diciembre'  : '426,87€',
};
const padValues = require('./index');
const amountLen = 0;
const monthLen  = 0;
const amounts   = padValues.left(Object.values(data), amountLen);
const months    = padValues.right(Object.keys(data), monthLen);
months.forEach(
    (month, index) => console.log(`|${month}|${amounts[index]}|`)
);
```

Auto length (`amountLen = 0` and `monthLen = 0`):

```
|Enero     |  1,23€|
|Febrero   | 25,54€|
|Marzo     |  2,69€|
|Abril     |123,45€|
|Mayo      | 95,12€|
|Junio     |856,46€|
|Julio     |568,45€|
|Agosto    |  0,05€|
|Septiembre|  9,85€|
|Octubre   | 15,69€|
|Noviembre |  1,49€|
|Diciembre |426,87€|
```

Truncate text (`amountLen = 4` and `monthLen = 3`):

```
|Ene|,23€|
|Feb|,54€|
|Mar|,69€|
|Abr|,45€|
|May|,12€|
|Jun|,46€|
|Jul|,45€|
|Ago|,05€|
|Sep|,85€|
|Oct|,69€|
|Nov|,49€|
|Dic|,87€|
```

Long length (`amountLen = 10` and `monthLen = 15`):

```
|Enero          |     1,23€|
|Febrero        |    25,54€|
|Marzo          |     2,69€|
|Abril          |   123,45€|
|Mayo           |    95,12€|
|Junio          |   856,46€|
|Julio          |   568,45€|
|Agosto         |     0,05€|
|Septiembre     |     9,85€|
|Octubre        |    15,69€|
|Noviembre      |     1,49€|
|Diciembre      |   426,87€|
```
