/**
 * Verifica la longitud que tendrán los textos y la calcula si es necesario
 * en función de los valores.
 *
 * @param {String[]} values Valores a formatear..
 * @param {Number}   length Longitud deseada de los textos.
 *
 * @return {Number}
 */
function checkLength(values, length)
{
    return typeof length === 'number' && length > 0
        ? length
        : Math.max(...values.map(value => value.length));
}
/**
 * Verifica los valores y los convierte a textos.
 *
 * @param {*[]} values Valores a convertir.
 *
 * @return {String[]}
 */
function checkValues(values)
{
    return Array.isArray(values)
        ? values.map(String)
        : [ String(values) ];
}
/**
 * Rellena el valor por la izquierda.
 *
 * @param {String} value Valor a formatear.
 * @param {String} pad   Texto a usar para rellenar el valor.
 *
 * @return {String} Texto formateado.
 */
function fillLeft(value, pad)
{
    return (pad + value).substr(-pad.length);
}

/**
 * Rellena el valor por la derecha.
 *
 * @param {String} value Valor a formatear.
 * @param {String} pad   Texto a usar para rellenar el valor.
 *
 * @return {String} Texto formateado.
 */
function fillRight(value, pad)
{
    return (value + pad).substr(0, pad.length);
}

/**
 * Formatea cada texto en un listado agregando el caracter especificado tantas veces
 * como sea necesario hasta tener la longitud especificada.
 *
 * El carácter puede ser agregado por la izquierda o por la derecha.
 *
 * @param {String[]} values Listado de textos.
 * @param {Number?}  length Longitud que tendrán los textos.
 *                          Si no se especifica se calcula.
 *                          Si es menor, el texto será truncado.
 * @param {String}   char   Carácter a usar para justificar el texto.
 * @param {Boolean}  left   Indica si se deben agregar los caracteres por la izquierda en vez de la derecha.
 *
 * @return {String[]} Listado de textos formateados.
 */
function padValues(values, length = 0, char = ' ', left = false)
{
    values     = checkValues(values);
    length     = checkLength(values, length);
    const _pad = char.repeat(length);
    const _fn  = left
        ? fillLeft
        : fillRight;

    return values.map(value => _fn(value, _pad));
}

module.exports = Object.assign(
    padValues,
    {
        /**
         * Formatea cada texto en un listado agregando por la izquierda el caracter especificado
         * tantas veces como sea necesario hasta tener la longitud especificada.
         *
         * @param {String[]} values Listado de textos.
         * @param {Number?}  length Longitud que tendrán los textos.
         *                          Si no se especifica se calcula.
         *                          Si es menor, el texto será truncado.
         * @param {String}   char   Carácter a usar para justificar el texto.
         *
         * @return {String[]} Listado de textos formateados.
         */
        left(values, length = 0, char = ' ')
        {
            return padValues(values, length, char, true);
        },
        /**
         * Formatea cada texto en un listado agregando por la derecha el caracter especificado
         * tantas veces como sea necesario hasta tener la longitud especificada.
         *
         * @param {String[]} values Listado de textos.
         * @param {Number?}  length Longitud que tendrán los textos.
         *                          Si no se especifica se calcula.
         *                          Si es menor, el texto será truncado.
         * @param {String}   char   Carácter a usar para justificar el texto.
         *
         * @return {String[]} Listado de textos formateados.
         */
        right(values, length = 0, char = ' ')
        {
            return padValues(values, length, char, false);
        }
    }
);
