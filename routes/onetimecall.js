var express = require('express');
var router  = express.Router();
var config  = require('../config'); 
var Twitter = require('twitter');
var emoji   = require('emoji');
var twilio  = require("twilio");
var twilioClient = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
var Subscription = require('../models/subscription');

var client  = new Twitter(config.twitter);

var emojisToText = function(text) {
  return text.replace(emoji.EMOJI_RE(), function (_, m) {
    var em = emoji.EMOJI_MAP[m];
    return em[1].toUpperCase() + " ";
  });
}

var placeCall = function(number) {
  var number = "+1" + req.body.onetimecaller;
  twilioClient.makeCall({
      to: number,
      from: '+14243552041',
      url: 'http://kimkalldashian.herokuapp.com/call'
  });
}

module.exports = router;