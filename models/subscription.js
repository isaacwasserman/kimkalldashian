mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    number: Number,
    twitter: String
})

var Subscription = module.exports = mongoose.model('Subscription', subscriptionSchema);