//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the name of the item'
  },
    description: {
        type: String
  },
    category: {
        type: String
    },
    location: {
        type: String
    },
    images: {
        type: String
    },
    price: {
        type: Number
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    delivery: {
        type: String
    },
    seller_name: {
        type: String
    },
    contact_info: {
        type: String
    }
});

module.exports = mongoose.model('Items', ItemSchema);