const cc2sep  = require('cc2sep').trimmed;
const propSep = require('prop-sep');
/**
 * Convierte un texto CamelCase a texto separado por el separador especificado.
 *
 * @param {String}   text          Texto a convertir.
 * @param {Object?}  opts          Opciones de la plantilla
 * @param {Boolean?} opts.hash.sep Separador a usar para generar el texto ('-' por defecto).
 *
 * @return {String}
 */
module.exports = function decamelize(text, opts)
{
    return text && typeof text === 'string'
        ? cc2sep(text, propSep.get(opts, 'hash.sep', '-'))
        : '';
};
