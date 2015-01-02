var express = require('express');
var router  = express.Router();
var config  = require('../config'); 
var Twitter = require('twitter');
var emoji   = require('emoji');
var twilio  = require("twilio");

var client  = new Twitter(config.twitter);

var emojisToText = function(text) {
  return text.replace(emoji.EMOJI_RE(), function (_, m) {
    var em = emoji.EMOJI_MAP[m];
    return em[1].toUpperCase + " ";
  });
}

router.post('/call', function(req, res) {
  
  twiml = new twilio.TwimlResponse();
  
  client.get('statuses/user_timeline', {screen_name: 'kimkardashian' }, function(error, body, response){
    if(error) throw error;
    var tweet = emojisToText(body[0].text);
    console.log(tweet);
    twiml.say(tweet);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    var client = require('twilio')(config.twilio);
    var tonumber = "+1" + subscriber.number;
    client.makeCall({
        to: tonumber,
        from: '+14243552041',
        url: 'http://kimkalldashian.herokuapp.com/call'
    });
    
  });
    
});
  
module.exports = router;