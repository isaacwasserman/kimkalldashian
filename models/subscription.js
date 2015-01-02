mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    number: {type: Number, unique: true},
    twitter: String
})

var Subscription = module.exports = mongoose.model('Subscription', subscriptionSchema);