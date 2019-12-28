const capitalize = require('./capitalize');
const decamelize = require('./decamelize');
const propSep    = require('prop-sep');
const sep2cc     = require('sep2cc');
/**
 * Convierte a CamelCase el texto especificado.
 *
 * @param {String}   text                 Texto a convertir.
 * @param {Object?}  opts                 Opciones de la plantilla
 * @param {Boolean?} opts.hash.capitalize Si es `false` no se convierte a mayúscula la primera letra.
 * @param {Boolean?} opts.hash.sep        Separador usado en el texto de entrada ('-' por defecto).
 *
 * @return {String}
 */
module.exports = function camelize(text, opts)
{
    const _sep = propSep.get(opts, 'hash.sep', '-');
    text       = sep2cc(decamelize(text, opts).replace(/[^a-zA-Z0-9]+/g, _sep), _sep);

    return text && propSep.get(opts, 'hash.capitalize') !== false
        ? capitalize(text)
        : text;
};
