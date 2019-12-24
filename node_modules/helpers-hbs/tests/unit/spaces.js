const assert = require('../assert');
const spaces = require('../../src/spaces');

/**
 * Verifica que dado un array se puedan rellenar con espacios cada valor del array.
 */
function testArray()
{
    const _lines = [];
    for (let _value of values)
    {
        const _spaces = spaces.call(_value, values);
        _lines.push(_value + _spaces);
        assert.assert('equal', _spaces, ' '.repeat(length - _value.length));
    }
    assert.assert('deepEqual', _lines, expected);
}

/**
 * Verifica que dado un objeto se puedan rellenar con espacios las claves.
 */
function testObjects()
{
    const _lines = [];
    const _key   = 'test-object';
    const _objs  = values.map(v => ({ [_key] : v }));
    for (let _obj of _objs)
    {
        const _spaces = spaces.call(_obj, _objs, _key);
        const _value  = _obj[_key];
        _lines.push(_value + _spaces);
        assert.assert('equal', _spaces, ' '.repeat(length - _value.length));
    }
    assert.assert('deepEqual', _lines, expected);
    // Si la clave no existe, devuelve una cadena vacía.
    assert.assert('equal', spaces.call(_objs[0], _objs, _key.split('').reverse().join('-')), '');
    // Si la clave no es válida, devuelve una cadena vacía.
    assert.assert('equal', spaces.call(_objs[0], _objs, 152), '');
    // Si el valor no es un objeto, devuelve una cadena vacía.
    _objs[0] = null;
    assert.assert('equal', spaces.call(_objs[0], _objs, _key.split('').reverse().join('-')), '');
}

/**
 * Verifica que se puedan filtar los elementos que computarán el resultado.
 */
function testFilter()
{
    const _buildLines = (items) =>
    {
        const _lines  = [];
        for (const _item of items)
        {
            const _spaces = spaces.call(_item, items, _key, { hash : { filter : _filter }});
            const _value  = _item[_key];
            _lines.push(_value + _spaces + _item.col);
        }

        return _lines;
    };
    const _filter = 'col:a';
    const _key    = 'val';
    assert.assert(
        'deepEqual',
        _buildLines(
            [
                { col : 'a', val : 'abc'   },
                { col : 'a', val : 'de'    },
                { col : 'a', val : 'fgh'   },
                { col : 'b', val : '12345' },
                { col : 'b', val : '67890' },
            ]
        ),
        ['abca', 'de a', 'fgha', '12345b', '67890b']
    );
    assert.assert(
        'deepEqual',
        _buildLines(
            [
                { col : 'a', val : 'abcdef'  },
                { col : 'a', val : 'ghij'    },
                { col : 'a', val : 'klmnopq' },
                { col : 'b', val : '12345'   },
                { col : 'b', val : '67890'   },
            ]
        ),
        [ 'abcdef a', 'ghij   a', 'klmnopqa', '12345  b', '67890  b' ]
    );
}

const values   = [
    'a',
    'bc',
    'def',
    'gh',
    'i',
    'jklm',
    'no',
];
const length   = Math.max(...values.map(k => k.length));
const expected = values.map(v => v + ' '.repeat(length - v.length));
//------------------------------------------------------------------------------
// Si no hay elementos o está vacío, devuelve una cadena vacía.
//------------------------------------------------------------------------------
assert.assert('equal', spaces(), '');
assert.assert('equal', spaces([]), '');
//------------------------------------------------------------------------------
testArray();
testFilter();
testObjects();
