'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the category'
  },
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'device'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
});

module.exports = mongoose.model('category', categorySchema);
