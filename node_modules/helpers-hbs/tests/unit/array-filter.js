const assert = require('../assert');
const items  = Array.from({ length : 10 }).map((i, index) => ({ index }));
assert.suite(
    'array-filter',
    'deepEqual',
    [
        [
            [null, 'index', 5],
            null
        ],
        [
            [false, '', 5],
            false
        ],
        [
            [items, 'index', 5],
            items.filter(i => i.index === 5)
        ],
        [
            [items, 'index', 5, {}],
            items.filter(i => i.index === 5)
        ],
        [
            [items, 'index', 5, '>='],
            items.filter(i => i.index >= 5)
        ]
    ]
);
