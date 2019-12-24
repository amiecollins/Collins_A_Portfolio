/**
 * Permite depurar el valor de las variables recibidas.
 *
 * @param {Array} args Listado de argumentos recibidos.
 */
module.exports = function log(...args)
{
    const _sep   = '#'.repeat(80);
    const _lines = [_sep, 'LOG:', _sep];
    args.forEach(
        (arg, i) =>
        {
            try
            {
                _lines.push(`${i}: ` + JSON.stringify(arg, null, 4));
            }
            catch (e)
            {
                _lines.push(`ERROR (args[${i}]): ${e.message}`);
            }
        }
    );
    _lines.push(_sep);

    return _lines.join('\n');
};
