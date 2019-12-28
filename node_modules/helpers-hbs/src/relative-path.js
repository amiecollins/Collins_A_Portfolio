const path      = require('path');
const propSep   = require('prop-sep');
const regexcape = require('regexcape');

/**
 * Convierte a una ruta el nombre de un módulo separado por el carácter especificado.
 *
 * @param {String} name Nombre del módulo a resolver.
 * @param {String} sep  Separador usado en el nombre del módulo.
 *
 * @return {String} Nombre convertido.
 */
function toPath(name, sep)
{
    return name.replace(new RegExp(regexcape(sep), 'g'), path.sep);
}

/**
 * Devuelve la ruta relativa entre dos módulos del mismo paquete.
 *
 * Por ejemplo, si el módulo actual es `jf.templates.file.Class` y quiere
 * resolverse `jf.templates.Base` el resultado sería `../Base`.
 *
 *
 * @param {String}  from          Módulo actual que va a incluir el módulo a resolver.
 * @param {String}  to            Módulo a resolver.
 * @param {Object?} opts          Opciones de la plantilla.
 * @param {String?} opts.hash.sep Separador usado en el nombre del módulo ('.' por defecto).
 *
 * @return {String} Ruta relativa.
 */
module.exports = function relativePath(from, to, opts)
{
    let _result;
    if (typeof from === 'string' && typeof to === 'string')
    {
        if (!from)
        {
            from = to || '.';
        }
        if (!to)
        {
            to = from;
        }
        const _sep    = propSep.get(opts, 'hash.sep', '.');
        const _to     = toPath(to, _sep);
        const _baseTo = path.basename(_to);
        _result       = path.join(
            path.relative(
                path.dirname(toPath(from, _sep)),
                path.dirname(_to)
            ),
            _baseTo
        );
        if (_result[0] !== '.' && _result[0] !== '/')
        {
            _result = './' + _result;
        }
    }
    else
    {
        _result = '';
    }
    return _result;
};
