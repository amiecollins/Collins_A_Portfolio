/**
 * Elimina los espacios en blanco del bloque de texto.
 *
 * @param {Object} opts Opciones de la plantilla.
 */
module.exports = function trim(opts)
{
    return String(opts.fn(this)).trim();
};
