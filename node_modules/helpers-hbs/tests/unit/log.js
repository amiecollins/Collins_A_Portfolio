const assert = require('../assert');
const sep    = '#'.repeat(80);
const header = [sep, 'LOG:', sep];
// Objeto recursivo para generar un error en JSON.stringify
const obj    = {};
obj.o        = obj;
assert.suite(
    'log',
    'equal',
    [
        [
            'A',
            [ ...header, '0: "A"', sep ].join('\n')
        ],
        [
            ['A', 123],
            [ ...header, '0: "A"', '1: 123', sep ].join('\n')
        ],
        [
            obj,
            [ ...header, 'ERROR (args[0]): Converting circular structure to JSON', sep ].join('\n')
        ]
    ]
);
