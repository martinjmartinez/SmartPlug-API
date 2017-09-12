const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the device'
  },
  status: {
      type: Boolean,
      Required: 'Enter status of the device'
  },
  ip_address: {
    type: String,
    Required: 'Enter the ip address of the device'
  },
  space: {
    type: Schema.Types.ObjectId,
    ref: "space"
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: "building"
  },
  histories: [{
    type: Schema.Types.ObjectId,
    ref: 'history'
  }],
});

module.exports = mongoose.model('device', deviceSchema);
