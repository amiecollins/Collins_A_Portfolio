const assert      = require('assert');
const propsep     = require('./index');
let numAssertions = 0;

function test(actual, expected)
{
    assert.deepEqual(actual, expected);
    ++numAssertions;
}

function testGetHas(path, expected)
{
    test(propsep.has(obj, path), path !== '');
    test(propsep.get(obj, path), expected);
    // Agregamos un path que no exista para probar `undefined`.
    path += '.qwe';
    test(propsep.has(obj, path), false);
    test(propsep.get(obj, path), undefined);
}

function testRemove(path, expected)
{
    testGetHas(path, expected);
    test(propsep.remove(obj, path), expected);
    test(propsep.get(obj, path), undefined);
}

//------------------------------------------------------------------------------
// Inicio de las pruebas
//------------------------------------------------------------------------------
const obj = {};
const c   = 5.3;
const d   = undefined;
const f   = 'texto';
const g   = null;
const e   = { f, g };
const b   = { c, d, e };
const a   = { b };
//-------------------------------------
// Pruebas: set
//-------------------------------------
propsep.set(obj, '', 5.3);
test(obj, {});
propsep.set(obj, 'a.b.c', c);
test(
    obj,
    { a : { b : { c } } }
);
propsep.set(obj, 'a.b.d', d);
test(
    obj,
    { a : { b : { c, d } } }
);
propsep.set(obj, 'a.b.e.f', f);
test(
    obj,
    { a : { b : { c, d, e : { f } } } }
);
propsep.set(obj, 'a.b.e.g', g);
test(obj, { a });
//-------------------------------------
// Pruebas: get/has
//-------------------------------------
testGetHas('', undefined);
testGetHas('a', a);
testGetHas('a.b', b);
testGetHas('a.b.c', c);
testGetHas('a.b.d', d);
testGetHas('a.b.e', e);
testGetHas('a.b.e.f', f);
testGetHas('a.b.e.g', g);
//-------------------------------------
// Pruebas: remove
//-------------------------------------
// Eliminamos g
testRemove('a.b.e.g', g);
testGetHas('a.b', { c, d, e : { f } });
// Eliminamos f
testRemove('a.b.e.f', f);
testGetHas('a.b', { c, d, e : { } });
// Eliminamos e
testRemove('a.b.e', { });
testGetHas('a.b', { c, d });
// Eliminamos c
testRemove('a.b.c', c);
testGetHas('a.b', { d });
// Eliminamos d
testRemove('a.b.d', d);
testGetHas('a.b', {});
// Eliminamos b
testRemove('a.b', {});
testGetHas('a', {});
// Eliminamos a
testRemove('a', {});
test(obj, {});
//-------------------------------------
// Pruebas: Escapando el separador
//-------------------------------------
propsep.set(obj, 'a.b\\.c.d.e\\.f\\.g', d);
test(obj['a']['b.c']['d']['e.f.g'], d);
testRemove('a.b\\.c.d.e\\.f\\.g', d);
testGetHas('a.b\\.c.d', { });
testGetHas('a', { ['b.c'] : { d: {} } });
testRemove('a.b\\.c.d', {});
testGetHas('a.b\\.c', { });
testGetHas('a', { ['b.c'] : {}});
testRemove('a.b\\.c', {});
testGetHas('a', { });
//
console.log('Total aserciones: %d', numAssertions);
