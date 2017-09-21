const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const powerLogSchema = new Schema({
  date: {
      type: Date
  },

  log:{
    type: Number,
    Required: 'Enter the power value'
  }
});

module.exports = mongoose.model('powerLog', powerLogSchema);
