# sep2cc [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm install sep2cc](https://nodei.co/npm/sep2cc.png?compact=true)](https://npmjs.org/package/sep2cc/)

Transform a char separated string into a camelCase one using a custom separator and accepting unicode chars.

You can modify `chars` property for customizing the text transformations in your application.

## Examples

### toCamelCase

```
'onceuponatime'                 -> 'onceuponatime'
'once-upon-a-time'              -> 'onceUponATime'
'-once-upon-a-time'             -> 'OnceUponATime'
'-o-n-c-e -u-p-o-n -a -t-i-m-e' -> 'ONCE UPON A TIME'
'inner-h-t-m-l'                 -> 'innerHTML'
'-áááá-éééé-íí-óóó'             -> 'ÁáááÉéééÍíÓóó'
```
