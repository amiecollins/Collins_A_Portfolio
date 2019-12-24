const { evaluate } = require('../utils');
/**
 * Filtra un listado de elementos.
 *
 * @param {Object[]} items Listado de elementos a filtrar.
 * @param {String}   key   Nombre de la clave a usar para filtrar.
 * @param {*}        value Valor a comparar para realizar el filtrado.
 * @param {String?}  op    Operador a usar en la comparación.
 *
 * @return {Object[]} Listado con el filtro aplicado.
 */
module.exports = function arrayFilter(items, key, value, op = '===')
{
    if (!op || typeof op !== 'string')
    {
        op = '===';
    }

    return key && Array.isArray(items)
        ? items.filter(item => item && evaluate(op, item[key], value))
        : items;
};
