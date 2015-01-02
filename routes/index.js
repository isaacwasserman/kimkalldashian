var express = require('express');
var router  = express.Router();
var path    = require('path');

router.get('/', function(req, res) {
  res.sendFile('/public/main.html', {'root': './'});
});

module.exports = router;