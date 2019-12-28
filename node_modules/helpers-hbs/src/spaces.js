const propSep = require('prop-sep');
/**
 * Verifica que la propiedad exista en el valor especificado y la devuelve como texto.
 *
 * @param {*}      value    Valor que debe tener la propiedad.
 * @param {String} property Nombre de la propiedad a verificar.
 *
 * @return {String} Valor a usar.
 */
function check(value, property)
{
    return  value && property in value
        ? String(value[property])
        : '';
}

/**
 * Crea cadenas de texto en blanco para rellenar y alinear textos en la plantilla.
 *
 * @param {Object}  items            Listado de elementos.
 * @param {String}  property         Nombre de la propiedad de `items` que se usará para obtener la longitud.
 * @param {Object?} opts             Opciones de la plantilla.
 * @param {String?} opts.hash.filter Columna usada para filtrar los elementos a usar para computar la longitud.
 *
 * @return {String} Valor formateado.
 */
module.exports = function spaces(items, property, opts)
{
    let _value;
    if (Array.isArray(items) && items.length)
    {
        if (property && typeof property === 'string')
        {
            const _filter = propSep.get(opts, 'hash.filter');
            if (_filter)
            {
                const [ _key, _value ] = _filter.split(':');
                if (this[_key] === _value)
                {
                    items = items.filter(i => i[_key] === _value);
                }
            }
            // Listado de elementos objetos que necesitan el valor de la propiedad.
            const _length = check(this, property).length;
            _value = ' '.repeat(
                Math.max(...items.map(i => check(i, property).length)) - _length
            );
        }
        else
        {
            // Listado de elementos escalares.
            _value = String(this);
            _value = ' '.repeat(Math.max(...items.map(i => String(i).length)) - _value.length);
        }
    }
    else
    {
        _value = '';
    }

    return _value;
};
