const assert = require('../assert');
const opts   = {
    fn()
    {
        return true;
    },
    inverse()
    {
        return false
    }
};

function generateTests(value1, value2)
{
    return ['==', '===', '!=', '!==', '>=', '<=', '!', '&&', '||', 'asd', ''].map(
        operator =>
        {
            let _result = '';
            switch (operator)
            {
                case '!':
                    _result = !value1;
                    break;
                case '!=':
                    _result = value1 != value2;
                    break;
                case '!==':
                    _result = value1 !== value2;
                    break;
                case '==':
                    _result = value1 == value2;
                    break;
                case '===':
                    _result = value1 === value2;
                    break;
                case '>=':
                    _result = value1 >= value2;
                    break;
                case '<=':
                    _result = value1 <= value2;
                    break;
                case '&&':
                    _result = value1 && value2;
                    break;
                case '||':
                    _result = value1 || value2;
                    break;
            }

            return [ [operator, value1, value2, opts], Boolean(_result) ];
        }
    );
}

assert.suite(
    'if-cond',
    'equal',
    [
        ...generateTests(false, false),
        ...generateTests(false, true),
        ...generateTests(true, true),
        ...generateTests(123, 123),
        ...generateTests(123, 12),
        ...generateTests('asd', 'asd'),
        ...generateTests('asd', 'as'),
        ...generateTests(0, null),
        ...generateTests([], []),
        ...generateTests({}, {}),
    ]
);
