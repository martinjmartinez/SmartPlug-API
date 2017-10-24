'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildingSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the building'
  },
  isActive: {
      type: Boolean,
      Required: 'Enter delete status of the building'
  },
  spaces: [{
    type: Schema.Types.ObjectId,
    ref: 'space'
  }],
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'device'
  }],
});

module.exports = mongoose.model('building', buildingSchema);
