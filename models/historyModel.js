const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "device"
  },
  startDate: {
      type: String,
      Required: 'Enter the start date'
  },
  endDate: {
    type: String
  },
  totalHours: {
    type: Number
  },
  powerLog:[{
    log: Number
  }]
});

module.exports = mongoose.model('history', historySchema);
