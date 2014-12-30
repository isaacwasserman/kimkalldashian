var express = require('express');
var app = express();

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

app.get('/', function(request, response) {
  // send mail with defined transport object

  
  response.sendFile(__dirname + '/public/main.html');
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
