const assert = require('../assert');
const chalk  = require('chalk');
const text   = 'Texto de prueba';
const opts   = {
    fn()
    {
        return text;
    }
};
assert.suite(
    'chalk',
    'equal',
    [
        [
            ['cyan', opts],
            chalk.cyan(text)
        ],
        [
            ['cyan', { ...opts, hash : { bold : true } }],
            chalk.cyan.bold(text)
        ],
        [
            ['unknown-color', opts],
            text
        ],
        [
            ['unknown-color', { ...opts, hash : { bold : true } }],
            text
        ]
    ]
);
