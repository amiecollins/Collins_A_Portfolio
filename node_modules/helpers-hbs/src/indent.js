const propSep = require('prop-sep');
/**
 * Indenta in bloque de texto.
 *
 * @param {Object?} opts Opciones de la plantilla.
 * @param {Object?} opts.hash.char Carácter a usar para indentar (` ` por defecto).
 * @param {Object?} opts.hash.size Tamaño de la indentación (`4` por defecto).
 */
module.exports = function indent(opts)
{
    let _content = opts.fn(this) || '';
    if (_content)
    {
        _content = _content
            .replace(/^/gm, propSep.get(opts, 'hash.char', ' ').repeat(propSep.get(opts, 'hash.size', 4)))
            .replace(/[ \t]+$/gm, '');
    }

    return _content;
};
