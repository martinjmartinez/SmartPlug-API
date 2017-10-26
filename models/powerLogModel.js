const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const powerLogSchema = new Schema({
  date: {
      type: Date,
      default: Date.now
  },
  log:{
    type: Number,
    Required: 'Enter the power value'
  }
});

module.exports = mongoose.model('powerLog', powerLogSchema);
