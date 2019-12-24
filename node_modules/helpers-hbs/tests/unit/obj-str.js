const assert = require('../assert');

function pad(text)
{
    return text.replace(/^/gm, ' '.repeat(4)).substr(4);
}

const objo = {
    pq    : 8,
    r     : 9,
    stu   : 10,
    vwxyz : 11
};
const stro = `{
    pq    : 8,
    r     : 9,
    stu   : 10,
    vwxyz : 11
}`;
const objg = {
    h   : 4,
    i   : 5,
    jk  : 6,
    lmn : 7,
    o   : objo
};
const strg = `{
    h   : 4,
    i   : 5,
    jk  : 6,
    lmn : 7,
    o   : ${pad(stro)}
}`;
const obj  = {
    a   : 1,
    bc  : 2,
    def : 3,
    g   : objg
};
const str  = `{
    a   : 1,
    bc  : 2,
    def : 3,
    g   : ${pad(strg)}
}`;
assert.suite(
    'obj-str',
    'equal',
    [
        [ null, '{}' ],
        [ 1, '{}' ],
        [ objg, strg ],
        [ objo, stro ],
        [ obj, str ]
    ]
);
