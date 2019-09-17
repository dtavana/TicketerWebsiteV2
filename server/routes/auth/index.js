const router = require('express').Router();

router.use('/discord', require('./discord'));

module.exports = router;
