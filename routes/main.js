var express = require('express');
var router = express.Router();

/** localhost/main/ */
router.get('/', function(req, res) {
    res.render('main');
});

module.exports = router;
