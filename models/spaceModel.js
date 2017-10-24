'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the space'
  },
  isActive: {
      type: Boolean
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: "building"
  },
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'device'
  }]
});

module.exports = mongoose.model('space', spaceSchema);
