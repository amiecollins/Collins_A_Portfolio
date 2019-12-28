const assert = require('./assert');
const path   = require('path');
const files  = require('../index').scandir(path.join(__dirname, 'unit'));

function jsonTest(filename)
{
    assert.suite(path.basename(filename, '.json'), 'equal', require(filename));
}

//------------------------------------------------------------------------------
// Ejecutamos las pruebas en los archivos JSON.
//------------------------------------------------------------------------------
files.filter(filename => filename.substr(-5) === '.json').forEach(jsonTest);
//------------------------------------------------------------------------------
// Ejecutamos las pruebas en los archivos JS.
//------------------------------------------------------------------------------
files.filter(filename => filename.substr(-3) === '.js').forEach(filename => require(filename));
//------------------------------------------------------------------------------
console.log('Total aserciones: %d', require('./assert').numAssertions);
