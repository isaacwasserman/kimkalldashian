var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var index        = require('./routes/index');
var subscription = require('./routes/subscription');
var call         = require('./routes/call');

mongoose.connect('mongodb://localhost/kimkalldashian');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/subscription', subscription);
app.use('/call', call);
app.use('/', index);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Kim is working it at localhost:" + app.get('port'));
});