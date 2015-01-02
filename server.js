var express      = require('express');
var path         = require('path');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var config       = require('./config');
var index        = require('./routes/index');
var subscription = require('./routes/subscription');
var call         = require('./routes/call');

var app = express();

mongoose.connect(config.mongo.uri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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