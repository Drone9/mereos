const mereos = require('mereos')

mereos.init('hello')
.then(resp => {
    console.log(resp);
})
.catch (err => {
    console.log(err);
})