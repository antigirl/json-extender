# json-extender
Allows you to extend JSON file,
Looks for pointer key with a path value. Keys need to be unique.
```
">>fileB": "./fileB.json"
```

```
var Promise = require('bluebird');
var extendJSON = require('./index');
var fileA = require('./fileA.json');

extendJSON(fileA, '>>').then(function (json) {
   console.log(JSON.stringify(json, null, 4))
}).catch(function (e) {
    console.log('error', e);
});
```

