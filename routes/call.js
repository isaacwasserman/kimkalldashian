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
    return em[1].toUpperCase + " ";
  });
}

var placeCall = function(number) {
  var number = "+1" + number;
  twilioClient.makeCall({
      to: number,
      from: '+14243552041',
      url: 'http://kimkalldashian.herokuapp.com/call'
  });
}

router.post('/', function(req, res) {
  twiml = new twilio.TwimlResponse();
  client.get('statuses/user_timeline', {screen_name: 'kimkardashian' }, function(error, body, response){
    if(error) throw error;
    var tweet = emojisToText(body[0].text);
    console.log(tweet);
    twiml.say(tweet);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
});

router.get('/', function(req, res) {
  Subscription.find({}, function(err, subscribers) {
    if (err) { console.log(err); };
    for(var x = 0; x < subscribers.length; x++) {
      placeCall(subscribers[x].number);
      console.log('Called: ' + subscribers[x].number);
    }
  });
});

module.exports = router;