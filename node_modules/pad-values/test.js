const assert    = require('assert');
const padValues = require('./index');

/**
 * Verifica el resultado para las longitudes especificadas.
 * Verifica también el uso de diferentes caracteres.
 */
function checkResults(expected, monthLen, amountLen)
{
    expected = expected.trim().split('\n').map(v => v.trim());
    [' ', '-', '#', '*', '+', '~'].forEach(
        char =>
        {
            const _months  = padValues.right(Object.keys(data), monthLen, char);
            const _amounts = padValues.left(Object.values(data), amountLen, char);
            _months.forEach(
                (month, index) =>
                {
                    assert.equal(
                        `|${month}|${_amounts[index]}|`,
                        expected[index].replace(/ /g, char)
                    );
                    ++numAssertions;
                }
            );
        }
    );
}

//-----------------------------------------------------------------------------
// Inicio del test.
//-----------------------------------------------------------------------------
let numAssertions = 0;
const data        = {
    'Enero'      : '1,23€',
    'Febrero'    : '25,54€',
    'Marzo'      : '2,69€',
    'Abril'      : '123,45€',
    'Mayo'       : '95,12€',
    'Junio'      : '856,46€',
    'Julio'      : '568,45€',
    'Agosto'     : '0,05€',
    'Septiembre' : '9,85€',
    'Octubre'    : '15,69€',
    'Noviembre'  : '1,49€',
    'Diciembre'  : '426,87€',
};
/**
 * Verifica el cálculo de la longitud cuando no se pasa como parámetro.
 */
checkResults(
    `
    |Enero     |  1,23€|
    |Febrero   | 25,54€|
    |Marzo     |  2,69€|
    |Abril     |123,45€|
    |Mayo      | 95,12€|
    |Junio     |856,46€|
    |Julio     |568,45€|
    |Agosto    |  0,05€|
    |Septiembre|  9,85€|
    |Octubre   | 15,69€|
    |Noviembre |  1,49€|
    |Diciembre |426,87€|
    `,
    0,
    0
);
/**
 * Verifica que se trunque el texto
 */
checkResults(
    `
    |Ene|,23€|
    |Feb|,54€|
    |Mar|,69€|
    |Abr|,45€|
    |May|,12€|
    |Jun|,46€|
    |Jul|,45€|
    |Ago|,05€|
    |Sep|,85€|
    |Oct|,69€|
    |Nov|,49€|
    |Dic|,87€|
    `,
    3,
    4
);
/**
 * Verifica que la longitud pueda ser mayor que el mayor de los textos.
 */
checkResults(
    `
    |Enero          |     1,23€|
    |Febrero        |    25,54€|
    |Marzo          |     2,69€|
    |Abril          |   123,45€|
    |Mayo           |    95,12€|
    |Junio          |   856,46€|
    |Julio          |   568,45€|
    |Agosto         |     0,05€|
    |Septiembre     |     9,85€|
    |Octubre        |    15,69€|
    |Noviembre      |     1,49€|
    |Diciembre      |   426,87€|
    `,
    15,
    10
);
//-----------------------------------------------------------------------------
console.log('Total aserciones: %d', numAssertions);
