//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: {
        type: String
  },
    username: {
        type: String
    },
    password: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Users', UserSchema);