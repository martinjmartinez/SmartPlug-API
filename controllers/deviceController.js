const Device = require('../models/deviceModel');
const Category = require('../models/categoryModel');

module.exports = {
  allDevices: async (req, res, next) => {
    const devices = await Device.find({});
    res.status(200).json(devices);
  },

  newDevice: async (req, res, next) => {
    const new_device = new Device(req.value.body);
    const device = await new_device.save();
    res.status(201).json(device);
  },

  getDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    const device = await Device.findById(deviceId);
    res.status(200).json(device);
  },

  replaceDevice: async (req, res, next) => {
    const {deviceId} = req.value.params;
    const new_device = req.value.body;
    const result = await Device.findByIdAndUpdate(deviceId, new_device);
    res.status(200).json({ success: true});
  },

  updateDevice: async (req, res, next) => {
    const {deviceId} = req.value.params;
    const new_device = req.value.body;
    const result = await Device.findByIdAndUpdate(deviceId, new_device);
    res.status(200).json({ success: true});
  },

  newDeviceCategory: async (req, res, next) => {
    const {deviceId} = req.value.params;
    //Create new category
    const new_category = new Category(req.value.body);
    //Get device
    const device = await Device.findById(deviceId);
    //Add category to the device
    device.category = new_category;
    //Save device
    await device.save();
    //Add device to category
    new_category.devices.push(device);
    //Save category
    await new_category.save();

    res.status(201).json(device);
  },

  addExistingCategoryToDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    const { categoryId } = req.value.params;
    //Create new category
    const category = await Category.findById(categoryId);
    //Get device
    const device = await Device.findById(deviceId);
    //Add category to the device
    device.category = category;
    //Save device
    await device.save();
    //Add device to category
    category.devices.push(device);
    //Save category
    await category.save();

    res.status(201).json(device);
  }
};
