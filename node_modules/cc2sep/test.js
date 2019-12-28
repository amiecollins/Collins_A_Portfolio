const assert      = require('assert');
const cc2sep      = require('./index');
let numAssertions = 0;

function checkFn(fn, cases)
{
    cases.forEach(
        ([actual, expected]) =>
        {
            for (const _separator of ['', '_', '-', '.'])
            {
                const _actual   = _separator
                    ? actual.replace(/-/g, _separator)
                    : actual;
                const _expected = _separator
                    ? expected.replace(/-/g, _separator)
                    : expected;
                const _result   = fn(_actual, _separator);
                assert.equal(
                    _result,
                    _expected,
                    `${fn.name} ${_actual} [${_separator}]: ${_result} !== ${_expected}`
                );
                ++numAssertions;
            }
        }
    );
}

checkFn(
    cc2sep,
    [
        ['', ''],
        ['onceuponatime', 'onceuponatime'],
        ['onceUponATime', 'once-upon-a-time'],
        ['OnceUponATime', '-once-upon-a-time'],
        ['ONCE UPON A TIME', '-o-n-c-e -u-p-o-n -a -t-i-m-e'],
        ['once-upon-a-time', 'once-upon-a-time'],
        ['innerHTML', 'inner-h-t-m-l'],
        ['ÁáááÉéééÍíÓóó', '-áááá-éééé-íí-óóó']
    ]
);
checkFn(
    cc2sep.trimmed,
    [
        ['', ''],
        ['onceuponatime', 'onceuponatime'],
        ['onceUponATime', 'once-upon-a-time'],
        ['OnceUponATime', 'once-upon-a-time'],
        ['ONCE UPON A TIME', 'o-n-c-e u-p-o-n a t-i-m-e'],
        ['once-upon-a-time', 'once-upon-a-time'],
        ['innerHTML', 'inner-h-t-m-l'],
        ['ÁáááÉéééÍíÓóó', 'áááá-éééé-íí-óóó']
    ]
);
console.log('Total aserciones: %d', numAssertions);
