var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var cool = require('cool-ascii-faces');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sumworldmyworld@gmail.com',
    pass: 'kinnock2013'
  }
});




app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.post('/submit', function(req, res) {
  console.log('SUBMITTING');
  console.log(req.body);
  res.redirect('/');
  
  var emailtext = "Someone just entered new words on whenisay.com! Adjective: " + req.body.adjective + " Noun: " + req.body.noun;
  var emailhtml = 'Someone just entered new words on whenisay.com!<br><span style="font-size:24px"><b>Adjective: </b></span>' + req.body.adjective + '<br><span style="font-size:24px"><b>Noun: </b></span>' + req.body.noun + '<br><br>View this WhenISay at: <a href="http://www.whenisay.com?adjective='req.body.adjective'&noun='req.body.noun'"></a>';
  
  var mailOptions = {
    from: 'When I Say... <whenisayinput@raritea.com>', // sender address
    to: 'whenisayinput@raritea.com', // list of receivers
    subject: 'New Input On When I Say!', // Subject line
    text: emailtext, // plaintext body
    html: emailhtml // html body
  };
  
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    console.log('Mail callback');
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
});

app.get('/', function(request, response) {
  // send mail with defined transport object

  
  response.sendFile(__dirname + '/public/main.html');
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
