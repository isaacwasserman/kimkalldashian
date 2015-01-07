var express      = require('express');
var router       = express.Router();
var twilio       = require('twilio');
var Subscription = require('../models/subscription');

router.get('/', function(req, res) {
  res.render('unsubscribe', {title: 'Unsubscribe?'});
});

router.post('/', function(req, res) {
  
  console.log('Input Submitted');
  console.log("Input Value: " + req.body.number);
  
  var input = req.body.number;
  
  if(input.match(/^[0-9]+$/) != null && input.length >= 10){
      Subscription.findOne({ number:input },function(err,docs){
        docs.remove();  //Remove all the documents that match!
      });
  } else {
    console.log("Input is not correctly formatted");
  }
  
  res.redirect('/');
  
});

module.exports = router;