const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "device"
  },
  startDate: {
      type: Date,
      Required: 'Enter the start date'
  },
  endDate: {
    type: Date
  },
  totalHours: {
    type: Number
  },
  powerLog:[{
    log: Number
  }]
});

module.exports = mongoose.model('history', historySchema);
