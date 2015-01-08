var express      = require('express');
var router       = express.Router();
var twilio       = require('twilio');
var Subscription = require('../models/subscription');
var helper       = require('../lib/helper');

router.get('/', function(req, res) {
  res.render('unsubscribe', {title: 'Unsubscribe?'});
});

router.post('/', function(req, res) {
  var phone = req.body.number;

  console.log("Submitted: " + phone + " for unsubscribe");
    
  if(helper.validatePhoneNumber(phone)) {

    Subscription.findOne( { number: phone }, function(err, subscription){

      if(subscription) {
        subscription.remove();
        res.redirect('/');
        
      } else {
        res.redirect('/unsubscribe');
      }

    });   
  }
});

module.exports = router;