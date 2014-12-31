var express = require('express');
var app = express();
var twilio = require("twilio");
var bodyParser = require('body-parser');




app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.post('/submit', function(req, res) {
  console.log('SUBMITTING');
  console.log(req.body);
  res.redirect('/');
  
  // Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACc35629f131fe39cc5b112a761d7492c0';
var authToken = "ae348584f7264cd2ff0d741c05b2bb32";
var client = require('twilio')(accountSid, authToken);
 
client.makeCall({

    to: '+18563322539', // Any number Twilio can call
    from: '+14243552041', // A number you bought from Twilio and can use for outbound communication
    url: 'http://twimlbin.com/external/5bce17e9d8a6643e' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    console.log(responseData.from); // outputs "+14506667788"

});
});


app.get('/', function(request, response) {
  // send mail with defined transport object

  
  response.sendFile(__dirname + '/public/main.html');
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
