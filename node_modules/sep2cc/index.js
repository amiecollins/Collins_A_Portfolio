const regexcape = require('regexcape');

/**
 * Función para convertir a formato camelCase cualquier texto separado por
 * el separador especificado.
 *
 * @param {String} text      Texto a convertir.
 * @param {String} separator Separador usado.
 *
 * @return {String} Texto convertido.
 */
function sep2cc(text, separator = '-')
{
    return String(text)
        .replace(
            new RegExp(`${regexcape(separator)}[${sep2cc.chars}]`, 'gu'),
            match => match.substr(1).toUpperCase()
        );
}

/**
 * Caracteres a tomar en cuenta como principio de palabra.
 *
 * @type {RegExp}
 */
sep2cc.chars = 'a-zñáéíóú';
//------------------------------------------------------------------------------
// Exportamos la función.
//------------------------------------------------------------------------------
module.exports = sep2cc;
