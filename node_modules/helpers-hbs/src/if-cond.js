const { evaluate } = require('../utils');
/**
 * Permite realizar una evaluación condicional en las plantillas.
 *
 * @param {Array} args Argumentos recibidos.
 *
 * @return {String}
 */
module.exports = function ifCond(...args)
{
    const _opts = args.pop();

    return evaluate(...args)
        ? _opts.fn(this)
        : _opts.inverse(this);
};
