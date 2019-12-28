/**
 * Convierte la primera letra de un texto en mayúsculas.
 *
 * @param {String} text Texto a convertir.
 *
 * @return {String}
 */
module.exports = function capitalize(text)
{
    return text && typeof text === 'string'
        ? text[0].toUpperCase() + text.substr(1)
        : '';
};
