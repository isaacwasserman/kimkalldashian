mongoose = require('mongoose');

var numberSchema = mongoose.Schema({
    number: {type: Number, unique: true}
})

var twitterSchema = mongoose.Schema({
    twitter: String
})

var Subscription = module.exports = mongoose.model('Subscription', numberSchema);