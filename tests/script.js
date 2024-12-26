const mereos = require('mereos');
const { logger } = require('../src/utils/functions');

mereos.init('hello')
.then(resp => {
    logger.success(resp);
})
.catch (err => {
    logger.error(err);
})