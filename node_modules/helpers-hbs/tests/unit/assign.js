const assert = require('../assert');
const assign = require('../../src/assign');
const obj = {};
[Math.random(), Math.random(), Math.random(), Math.random()].forEach(
    (value, index) =>
    {
        const _key = String.fromCharCode(65 + index);
        assign.call(obj, _key, value);
        assert.assert('equal', obj[_key], value);
    }
);
