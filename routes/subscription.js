var express      = require('express');
var router       = express.Router();
var twilio       = require('twilio');
var Subscription = require('../models/subscription');
var helper       = require('../lib/helper');

router.get('/', function(req, res) {
  Subscription.find({}, 'number', function(err, subscriptions) {
    var subs = [];
    for(var x=0; x < subscriptions.length; x++){
      subs.push(subscriptions[x].number);
    }
    res.render('subscriptions', {me: 'isaac', numbers: subs} );
  });
});

router.post('/', function(req, res) {
  var phone = req.body.number;

  console.log("Submitted: " + phone + " for subscription");
  
  if(helper.validatePhoneNumber(phone)) {
    var subscriber = new Subscription({number: phone, twitter: 'kimkardashian'});
    subscriber.save(function (err, subscriber, numberAffected) {
      if (err) {
        console.log(err);
        res.render('index', {message: 'Uh oh. Something went wrong. Try subscribing again.'});
      } else {
        res.render('index', {message: 'Thank you for subscribing!'});
      }
    });
  } else {
    res.render('index', {message: "That wasn't a valid phone number. Try again."});
  }
  
  
  
});

module.exports = router;