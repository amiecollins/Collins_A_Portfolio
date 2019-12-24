const assert = require('../assert');
const opts   = {
    fn(c)
    {
        return c[0];
    }
};
const data   = ['lorem ipsum'];
assert.suite(
    'indent',
    'equal',
    [
        [
            opts,
            '    lorem ipsum',
            data
        ],
        [
            opts,
            '',
            ['']
        ],
        [
            { ...opts, hash : { size : 8 } },
            '        lorem ipsum',
            data
        ],
        [
            { ...opts, hash : { size : 8, char : '-' } },
            '--------lorem ipsum',
            data
        ]
    ]
);
