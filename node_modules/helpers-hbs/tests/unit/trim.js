const assert = require('../assert');
const text   = 'ABcdEF ghiJKLmn';
assert.suite(
    'trim',
    'equal',
    [
        [
            {
                fn()
                {
                    return text;
                }
            },
            text
        ],
        [
            {
                fn()
                {
                    return ' '.repeat(10) + text;
                }
            },
            text
        ],
        [
            {
                fn()
                {
                    return text + ' '.repeat(10);
                }
            },
            text
        ],
        [
            {
                fn()
                {
                    return ' '.repeat(10) + text + ' '.repeat(10);
                }
            },
            text
        ],
        [
            {
                fn()
                {
                    return 1;
                }
            },
            '1'
        ],
        [
            {
                fn()
                {
                    return {};
                }
            },
            '[object Object]'
        ],
        [
            {
                fn()
                {
                    return null;
                }
            },
            'null'
        ]
    ]
);
