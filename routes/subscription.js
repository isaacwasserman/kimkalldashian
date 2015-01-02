var express      = require('express');
var router       = express.Router();
var twilio       = require('twilio');
var Subscription = require('../models/subscription');

router.get('/', function(req, res) {
  Subscription.find({}, function(err, subscriptions) {
    res.send(subscriptions);
  });
});

router.post('/', function(req, res) {
  
  console.log('Input Submitted');
  console.log("Input Value: " + req.body.number);
  
  var input = req.body.number;
  
  if(input.match(/^[0-9]+$/) != null && input.length >= 10){
    var subscriber = new Subscription({number: req.body.number, twitter: 'kimkardashian'});

    subscriber.save(function (err, subscriber, numberAffected) {
      if (err) { 
        console.log(err); 
      }
    });
  } else {
    console.log("Input is not correctly formatted");
  }
  
  res.redirect('/');
  
});

module.exports = router;