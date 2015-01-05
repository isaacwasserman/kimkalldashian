var express      = require('express');
var router       = express.Router();
var twilio       = require('twilio');
var Subscription = require('../models/subscription');

router.get('/', function(req, res) {
  Subscription.find({}, 'number', function(err, subscriptions) {
    var subs = [];
    for(var x=0; x < subscriptions.length; x++){
      subs.push(subscriptions[x].number);
    }
    res.render('subscriptions', {me: 'isaac', numbers: subs} );
  });
});

module.exports = router;