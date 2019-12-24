const assert      = require('assert');
const path        = require('path');
let numAssertions = 0;
module.exports    = {
    get numAssertions()
    {
        return numAssertions;
    },
    assert(name, ...args)
    {
        try
        {
            assert[name](...args);
            ++numAssertions;
        }
        catch (e)
        {
            console.log('ERROR: %s\nARGS:\n%s', e.message, JSON.stringify(args, null, 4));
            throw e;
        }
    },
    suite(helper, method, tests)
    {
        let _index = 0;
        try
        {
            const _helper = require(path.join(__dirname, '..', 'src', helper));
            tests.forEach(
                ([args, expected, context], index) =>
                {
                    _index = index;
                    if (!Array.isArray(args))
                    {
                        args = [args];
                    }
                    this.assert(method, _helper.apply(context, args), expected)
                }
            );
        }
        catch (e)
        {
            console.log('ERROR (%s[%s]) ==> %s\n%s', helper, _index, e.message, e.stack);
        }
    }
};
