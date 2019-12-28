const padValues = require('pad-values');

function formatLine(key, value, opts)
{
    if (value && typeof value === 'object')
    {
        value = objStr(value, opts).replace(/^/mg, opts.indent).trim();
    }
    return `${opts.indent}${key} ${opts.glue} ${value}`;
}

/**
 * Permite formatear un objeto y convertirlo en texto..
 *
 * Por ejemplo, para las siguientes llamadas:
 *
 * ```js
 * // JS
 * console.log(objStr({ a: 1, aa: 2 }));
 * // PHP
 * console.log(objStr({ "'a'": 1, "'aa'": 2 }, { open: '[', close: ']', glue: '=>' }));
 * ```
 *
 * Obtendríamos:
 *
 * ```
 * {
 *     a  : 1,
 *     aa : 2
 * }
 * [
 *     'a'  => 1,
 *     'aa' => 2
 * ]
 * ```
 *
 * @param {Object}  obj              Objeto a convertir.
 * @param {Object?} opts             Opciones de conversión.
 * @param {String?} opts.hash.open   Carácter de apertura (`{` por defecto).
 * @param {String?} opts.hash.close  Carácter de cierre (`}` por defecto).
 * @param {String?} opts.hash.glue   Texto a usar para unir la clave y su valor (`:` por defecto).
 * @param {String?} opts.hash.indent Indentación al inicio de cada línea.
 *
 * @return {String}
 */
function objStr(obj, opts)
{
    let _result;
    if (obj && typeof obj === 'object')
    {
        const _opts = Object.assign(
            {
                close  : '}',
                glue   : ':',
                indent : '    ',
                open   : '{'
            },
            opts && opts.hash
        );
        const _keys = Object.keys(obj).sort();
        _result     = [
            _opts.open,
            padValues(_keys).map((key, index) => formatLine(key, obj[_keys[index]], _opts)).join(',\n'),
            _opts.close
        ].join('\n');
    }
    else
    {
        _result = '{}';
    }
    //
    return _result;
}

//------------------------------------------------------------------------------
module.exports = objStr;
