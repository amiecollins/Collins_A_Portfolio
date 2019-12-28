function get(obj, segments)
{
    let _value;
    if (segments.length)
    {
        if (isObject(obj))
        {
            const _key = segments.shift();
            if (_key in obj)
            {
                _value = get(obj[_key], segments);
            }
        }
    }
    else
    {
        _value = obj;
    }

    return _value;
}

function has(obj, segments, exists = false)
{
    if (segments.length)
    {
        if (isObject(obj))
        {
            const _key = segments.shift();
            exists = _key in obj;
            if (exists)
            {
                exists = has(obj[_key], segments, exists);
            }
        }
        else
        {
            exists = false;
        }
    }

    return exists;
}

function isObject(obj)
{
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

function remove(obj, segments)
{
    let _result;
    if (segments.length)
    {
        if (isObject(obj))
        {
            const _key = segments.shift();
            if (_key in obj)
            {
                if (segments.length)
                {
                    _result = remove(obj[_key], segments);
                }
                else
                {
                    _result = obj[_key];
                    delete obj[_key];
                }
            }
        }
    }

    return _result;
}

function set(obj, segments, value)
{
    const _key = segments.shift();
    if (segments.length)
    {
        let _obj = obj[_key];
        if (!isObject(_obj))
        {
            _obj = obj[_key] = {}
        }
        set(_obj, segments, value);
    }
    else if (_key)
    {
        obj[_key] = value;
    }
}

function split(key, sep)
{
    if (!sep)
    {
        sep = '.';
    }
    const _segments = String(key).split(sep);
    if (key.includes('\\'))
    {
        let _index = 0;
        while (_index < _segments.length)
        {
            let _segment = _segments[_index];
            while (_segment.substr(-1) === '\\')
            {
                let _last = _segments.splice(_index + 1, 1).join('') || '';
                if (_last)
                {
                    _last = sep + _last;
                }
                _segment = _segments[_index] = _segment.substr(0, _segment.length -1) + _last;
                if (_index === _segments.length - 1)
                {
                    break;
                }
            }
            ++_index;
        }
    }

    return _segments;
}

/**
 * Funciones exportadas que permiten trabajar con objetos anidados.
 */
module.exports = {
    /**
     * Devuelve el valor de la clave.
     *
     * @param {Object}  obj    Objeto a manipular.
     * @param {String}  key    Nombre de la clave.
     * @param {*?}      defval Valor a usar si la clave no existe.
     * @param {String?} sep    Separador a usar (`.` por defecto).
     *
     * @return {*} Valor de la clave o `undefined` si no existe.
     */
    get(obj, key, defval, sep)
    {
        const _value = get(obj, split(key, sep));

        return _value === undefined
            ? defval
            : _value;
    },
    /**
     * Indica si la clave existe.
     *
     * @param {Object}  obj Objeto a manipular.
     * @param {String}  key Nombre de la clave. Se puede usar un `.` para separar objectos.
     * @param {String?} sep Separador a usar (`.` por defecto).
     *
     * @return {Boolean} `true` si la clave existe.
     */
    has(obj, key, sep)
    {
        return has(obj, split(key, sep));
    },
    /**
     * Elimina la clave del objeto.
     *
     * @param {Object}  obj Objeto a manipular.
     * @param {String}  key Nombre de la clave.
     * @param {String?} sep Separador a usar (`.` por defecto).
     */
    remove(obj, key, sep)
    {
        return remove(obj, split(key, sep));
    },
    /**
     * Asigna el valor de la clave.
     *
     * @param {Object}  obj   Objeto a manipular.
     * @param {String}  key   Nombre de la clave.
     * @param {*}       value Valor a asignar a la clave.
     * @param {String?} sep   Separador a usar (`.` por defecto).
     */
    set(obj, key, value, sep)
    {
        return set(obj, split(key, sep), value);
    }
};

