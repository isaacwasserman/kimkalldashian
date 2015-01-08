var express = require('express');
var router  = express.Router();
var config  = require('../config'); 
var Twitter = require('twitter');
var emoji   = require('emoji');
var twilio  = require("twilio");
var twilioClient = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
var Subscription = require('../models/subscription');

var client  = new Twitter(config.twitter);

router.get('/', function(req, res) {
  res.render('onetime', {title: 'One Time Thing'});
});

module.exports = router;