# cc2sep [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install cc2sep](https://nodei.co/npm/cc2sep.png?compact=true)](https://npmjs.org/package/cc2sep/)

Transform a camelized string into a lowercased one using a custom separator and accepting unicode uppercase chars.

You can modify `regexp` property for customizing the text transformations in your application.

## Examples

### cc2sep

```
'onceuponatime'    -> 'onceuponatime'
'onceUponATime'    -> 'once-upon-a-time'
'OnceUponATime'    -> '-once-upon-a-time'
'ONCE UPON A TIME' -> '-o-n-c-e -u-p-o-n -a -t-i-m-e'
'once-upon-a-time' -> 'once-upon-a-time'
'innerHTML'        -> 'inner-h-t-m-l'
'ÁáááÉéééÍíÓóó'    -> '-áááá-éééé-íí-óóó'
```

### cc2sep.trimmed

```
'onceuponatime'    -> 'onceuponatime'
'onceUponATime'    -> 'once-upon-a-time'
'OnceUponATime'    -> 'once-upon-a-time'
'ONCE UPON A TIME' -> 'o-n-c-e u-p-o-n a t-i-m-e'
'once-upon-a-time' -> 'once-upon-a-time'
'innerHTML'        -> 'inner-h-t-m-l'
'ÁáááÉéééÍíÓóó'    -> 'áááá-éééé-íí-óóó'
```
