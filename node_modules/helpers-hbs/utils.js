/**
 * Utilidades comunes a los helpers.
 */
module.exports = {
    /**
     * Realiza la operación boolean especificada entre los valores especificados.
     *
     * @param {String} operator   Operación a realizar.
     * @param {*}      leftValue  Valor a usar en la operación.
     * @param {*}      rightValue Valor a usar en la operación.
     *
     * @return {Boolean} Resultado de la operación.
     */
    evaluate(operator, leftValue, rightValue)
    {
        let _result;
        switch (operator)
        {
            case '!':
                _result = !leftValue;
                break;
            case '!=':
                _result = leftValue != rightValue;
                break;
            case '!==':
                _result = leftValue !== rightValue;
                break;
            case '==':
                _result = leftValue == rightValue;
                break;
            case '===':
                _result = leftValue === rightValue;
                break;
            case '>=':
                _result = leftValue >= rightValue;
                break;
            case '<=':
                _result = leftValue <= rightValue;
                break;
            case '&&':
                _result = leftValue && rightValue;
                break;
            case '||':
                _result = leftValue || rightValue;
                break;
            default:
                _result = false;
                break;
        }

        return _result;
    }
};
