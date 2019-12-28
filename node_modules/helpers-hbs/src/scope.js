const propSep = require('prop-sep');
/**
 * Devuelve el ámbito de una propiedad o método.
 * Por convención, se tienen los siguientes prefijos:
 * - '_' es protegida.
 * - '__' es privada.
 * - Las demás son públicas.
 *
 * @param {String}   name             Nombre a verificar.
 * @param {Object?}  opts             Opciones de la plantilla
 * @param {Boolean?} opts.hash.public `false` para ocultar el texto `@public`.
 *
 * @return {string} Ámbito del la propiedad o método.
 */
module.exports = function scope(name, opts)
{
    let _scope = '';
    if (name && typeof name === 'string')
    {
        if (name[0] === '_')
        {
            _scope = name[1] === '_'
                ? '@private'
                : '@protected';
        }
        else if (propSep.get(opts, 'hash.public') !== false)
        {
            _scope = '@public';
        }
    }
    return _scope;
};
