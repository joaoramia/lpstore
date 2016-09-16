'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/inventory', require('./inventory'));
router.use('/address', require('./address'));
router.use('/cart', require('./cart'));
router.use('/item', require('./item'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});