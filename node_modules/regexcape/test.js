const assert    = require('assert');
const fs        = require('fs');
const path      = require('path');
const regexcape = require('./index');
const reChars   = '^$\\.*+?()[]{}|';

/**
 * Verifica que el carácter actual sea el esperado.
 *
 * @param {String|Number} actual   Carácter actual a verificar.
 * @param {String|Number} expected Carácter esperado.
 */
function check(actual, expected)
{
    assert.equal(actual, expected);
    ++numAssertions;
}
/**
 * Comprueba que el texto especificado se escape correctamente.
 */
function checkText(text)
{
    const _escaped = regexcape(text);
    let   _j       = 0;
    for (let _i = 0, _l = text.length; _i < _l; ++_i, ++_j)
    {
        const _char = text[_i];
        if (reChars.includes(_char))
        {
            check(_escaped[_j    ], '\\');
            check(_escaped[_j + 1], _char);
            ++_j;
        }
        else
        {
            check(_escaped[_j], _char);
        }
    }
    // Verificamos que se hayan comprobado todos los caracteres del texto escapado.
    check(_j, _escaped.length);
}
//-----------------------------------------------------------------------------
// Inicio del test.
//-----------------------------------------------------------------------------
let numAssertions = 0;
// Verificamos los caracteres especiales.
checkText(reChars);
// Verificamos cada carácter especial precedido de otro carácter
(reChars + ' @#~\\="\'').split().forEach(char => checkText(reChars.replace(/./g, char + '$&')));
// Verificamos que los caracteres de la expresión regular del código fuente se escapen correctamente.
checkText(fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8' ));
//-----------------------------------------------------------------------------
console.log('Total aserciones: %d', numAssertions);
