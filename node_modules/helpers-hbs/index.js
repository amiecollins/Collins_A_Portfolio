const fs   = require('fs');
const path = require('path');
const src  = path.join(__dirname, 'src');

module.exports = {
    /**
     * Registra todos los helpers de un directorio.
     *
     * @param {Handlebars} hbs Manejador de la plantilla.
     * @param {string}     dir Directorio donde se buscarán los helpers.
     */
    registerAll(hbs, dir = src)
    {
        if (fs.existsSync(dir))
        {
            this.scandir(dir).forEach(
                filename => this.registerHelper(hbs, filename)
            );
        }
    },
    /**
     * Registra un helper en handlebars.
     *
     * @param {Handlebars} hbs       Módulo de handlebars a usar.
     * @param {string}     filename  Ruta completa del archivo del helper.
     * @param {boolean}    overwrite Sobrescribe el helper existente.
     */
    registerHelper(hbs, filename, overwrite = true)
    {
        if (fs.existsSync(filename))
        {
            const _helpers = hbs.helpers;
            const _name    = path.basename(filename, path.extname(filename));
            if (overwrite || !_helpers[_name])
            {
                hbs.registerHelper(_name, require(filename));
            }
        }
    },
    /**
     * Compila una plantilla y devuelve el resultado.
     *
     * @param {Handlebars} hbs      Manejador de la plantilla.
     * @param {string}     filename Ruta completa del archivo de la plantilla.
     * @param {object}     context  Contexto de la plantilla.
     * @param {object}     options  Opciones para compilar la plantilla.
     *
     * @return {string} Plantilla renderizada.
     */
    render(hbs, filename, context = {}, options = {})
    {
        let _content = '';
        if (filename && fs.existsSync(filename))
        {
            const _tpl = fs.readFileSync(filename, 'utf8');
            if (_tpl)
            {
                _content = hbs.compile(
                    _tpl,
                    Object.assign(
                        {
                            noEscape : true
                        },
                        options
                    )
                )(context);
            }
        }

        return _content;
    },
    /**
     * Escanea un directorio de manera no recursiva.
     *
     * @param {string} dir Ruta del directorio a escanear.
     *
     * @return {string[]} Ruta completa de los archivos encontrados.
     */
    scandir(dir)
    {
        return fs.existsSync(dir)
            ? fs.readdirSync(dir).map(file => path.join(dir, file))
            : [];
    }
};
