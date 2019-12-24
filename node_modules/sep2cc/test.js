const assert      = require('assert');
const sep2cc      = require('./index');
let numAssertions = 0;

function checkFn(fn, cases)
{
    cases.forEach(
        ([actual, expected]) =>
        {
            for (const _separator of ['_', '-', '.'])
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
    sep2cc,
    [
        ['', ''],
        ['onceuponatime', 'onceuponatime'],
        ['once-upon-a-time', 'onceUponATime'],
        ['-once-upon-a-time', 'OnceUponATime'],
        ['-o-n-c-e -u-p-o-n -a -t-i-m-e', 'ONCE UPON A TIME'],
        ['inner-h-t-m-l', 'innerHTML'],
        ['-áááá-éééé-íí-óóó', 'ÁáááÉéééÍíÓóó']
    ]
);
console.log('Total aserciones: %d', numAssertions);
