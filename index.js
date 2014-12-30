var express = require('express');
var app = express();
var twilio = require("../node_modules/twilio");
var bodyParser = require('body-parser');




app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.post('/submit', function(req, res) {
  console.log('SUBMITTING');
  console.log(req.body);
  res.redirect('/');
});


// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACc35629f131fe39cc5b112a761d7492c0';
var authToken = "ae348584f7264cd2ff0d741c05b2bb32";
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Hello Isaac",
    to: "+18563322539",
    from: "+14243552041"
}, function(err, message) {
    process.stdout.write(message.sid);
});


app.get('/', function(request, response) {
  // send mail with defined transport object

  
  response.sendFile(__dirname + '/public/main.html');
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
