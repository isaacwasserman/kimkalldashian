var express = require('express');
var app = express();
var twilio = require("twilio");
var bodyParser = require('body-parser');
var Twitter = require('twitter');

var accountSid = 'ACc35629f131fe39cc5b112a761d7492c0';
var authToken = "ae348584f7264cd2ff0d741c05b2bb32";

var twiller = new twilio.RestClient(accountSid, authToken);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var client = new Twitter({
  consumer_key: '1EiAX9mfzD76G7gaVF8zy4J5s',
  consumer_secret: '1X14H1a33cBtiK7fdrWzqf3maUWLKH3Qmq7D6z8qBNt5JxaBXB',
  access_token_key: '24368301-ACYi5VmdUJEeYy4knkA6BpkUAXm3tX07WXyAvdLgQ',
  access_token_secret: 'WTuctWabzESIsa8eq50TS5u7kFBwBNyQvvjPsJvTuS6w1'
});

var tweet = client.get('statuses/user_timeline', {screen_name: 'kimkardashian' }, function(error, body, response){
    if(error) throw error;
    var tweet = body[0].text;
    console.log("Tweet = " + tweet);
    var translatedtweet = tweet.replace(/U+1F4AA/, "'Muscle Emoji'");
    console.log("Translated Tweet = " + translatedtweet);
});

console.log

app.post('/submit', function(req, res) {
  console.log('Input Submitted');
  console.log("Input Value: " + req.body.number);
  res.redirect('/');
  var input = req.body.number;
  if(input.match(/^[0-9]+$/) != null && input.length >= 10){
    // Your accountSid and authToken from twilio.com/user/account

    var client = require('twilio')(accountSid, authToken);
    console.log("Input is correctly formatted");
    var tonumber = "+1" + req.body.number;
    
    client.makeCall({
        to: tonumber, // Any number Twilio can call
        from: '+14243552041', // A number you bought from Twilio and can use for outbound communication
        url: 'http://kimkalldashian.herokuapp.com/call' // A URL that produces an XML document (TwiML) which contains instructions for the call
    }, function(err, responseData) {
        //executed when the call has been initiated.
        console.log(responseData.from); // outputs "+14506667788"
    });
}
  else {console.log("Input is not correctly formatted");}
});

app.post('/call', function(req, res) {
  twiml = new twilio.TwimlResponse();
  client.get('statuses/user_timeline', {screen_name: 'kimkardashian' }, function(error, body, response){
    if(error) throw error;
    var tweet = body[0].text;
    twiml.say(tweet);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
});

app.get('/', function(request, response) {
  // send mail with defined transport object

  
  response.sendFile(__dirname + '/public/main.html');
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
