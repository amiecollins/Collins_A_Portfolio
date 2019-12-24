const regexcape = require('regexcape');

/**
 * Función para convertir texto en formato camelCase a minúsculas separadas en
 * palabras.
 *
 * @param {String}  text      Texto a convertir.
 * @param {String?} separator Separador a usar ('-' por defecto).
 *
 * @return {String} Texto convertido.
 */
function cc2sep(text, separator)
{
    return String(text)
        .replace(cc2sep.regexp, (separator || '-') + '$1')
        .toLowerCase();
}

/**
 * Función para convertir texto en formato camelCase a minúsculas separadas en
 * palabras eliminando el separador al final o al principio y entre palabras.
 *
 * @param {String}  text      Texto a convertir.
 * @param {String?} separator Separador a usar ('-' por defecto).
 *
 * @return {String} Texto convertido.
 */
cc2sep.trimmed = function cc2sepTrimmed(text, separator)
{
    if (!separator)
    {
        separator = '-';
    }
    const _pattern = regexcape(separator);
    return cc2sep(text, separator)
        .replace(new RegExp(`(^${_pattern}+|${_pattern}+$)`, 'g'), '')
        .replace(new RegExp(`(\\s)+${_pattern}+`, 'g'), '$1');
};
/**
 * Expresión regular a usar para convertir las mayúsculas.
 *
 * @type {RegExp}
 */
cc2sep.regexp = /([A-ZÑÁÉÍÓÚ])/gu;
//------------------------------------------------------------------------------
// Exportamos la función.
//------------------------------------------------------------------------------
module.exports = cc2sep;
