/**
 * Caracteres especiales en una expresión regular.
 *
 * @type {RegExp}
 */
const regexp = /[\\.*+?()[\]{}|^$]/g;

/**
 * Reemplaza los caracteres especiales en una expresión regular.
 *
 * @param {String} text Texto a modificar.
 *
 * @return {String} Texto modificado.
 */
module.exports = text => String(text).replace(regexp, '\\$&');
