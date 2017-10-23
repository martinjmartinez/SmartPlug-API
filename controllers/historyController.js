const Device = require('../models/deviceModel');
const History = require('../models/historyModel');
const PowerLog = require('../models/powerLogModel');

module.exports = {
  allHistories: async (req, res, next) => {
    const hitories = await History.find({});
    res.status(200).json(hitories);
  },

  newHistory: async (req, res, next) => {
    const new_history = new History(req.value.body);
    const { deviceId } = req.value.params;
    //Get device
    const device = await Device.findById(deviceId);
    new_history.device = device;

    const history = await new_history.save();
    device.lastHistoryId = history._id;
    await device.save();
    res.status(201).json(history);
  },

  getHistory: async (req, res, next) => {
    const { historyId } = req.value.params;
    const history = await History.findById(historyId);
    res.status(200).json(history);
  },

  updateHistoryLog: async (req, res, next) => {
    const { historyId } = req.value.params;
    const { powerValue } = req.value.params;

    const powerLog = new PowerLog();
    powerLog.log = powerValue;
    powerLog.date = new Date;
    const history = await History.findById(historyId);
    history.powerLog.push(powerLog);
    await history.save();
    res.status(200).json({ success: true});
  },

  closeHistory: async (req, res, next) => {
    const {historyId} = req.value.params;
    const new_history = req.value.body;
    const result = await History.findByIdAndUpdate(historyId, new_history);
    const device = await Device.findById(result.device);
    device.histories.push(result);
    await device.save();
    const newHistory = await result.save();
    const historial = await History.findById(newHistory._id);
    res.status(201).json(historial);
  },

  addHistoryToDevice: async (req, res, next) => {
    const { historyId } = req.value.params;
    const { deviceId } = req.value.params;
    //Create new space
    const history = await Space.findById(historyId);
    //Get device
    const device = await Device.findById(deviceId);

    device.histories.push(history);
    //Save space
    await device.save();

    res.status(201).json(device);
  }
};
