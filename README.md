# json-extender
Allows you to extend JSON file,
Looks for pointer key with a path value
">>fileB": "./fileB.json"

Keys need to be unique.

```
var Promise = require('bluebird');
var extendJSON = require('./index');
var fileA = require('./fileA.json');

extendJSON(fileA, '>>').then(function (e) {
   console.log(JSON.stringify(e, null, 4))
}).catch(function (e) {
    console.log('error', e);
});
```

