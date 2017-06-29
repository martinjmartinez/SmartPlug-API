const Device = require('../models/deviceModel');
const Category = require('../models/categoryModel');

module.exports = {
  allCategories: async (req, res, next) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
  },

  newCategory: async (req, res, next) => {
    const new_category = new Category(req.value.body);
    const category = await new_category.save();
    res.status(201).json(category);
  },

  getCategory: async (req, res, next) => {
    const { categoryId } = req.value.params;
    const category = await Category.findById(categoryId);
    res.status(200).json(category);
  },

  updateCategory: async (req, res, next) => {
    const {categoryId} = req.value.params;
    const new_category = req.value.body;
    const result = await Category.findByIdAndUpdate(categoryId, new_category);
    res.status(200).json({ success: true});
  },

  getCategoryDevices: async (req, res, next) => {
    const { categoryId } = req.value.params;
    const category = await Category.findById(categoryId).populate('devices');
    res.status(200).json(category.devices);
  },

  addDeviceToCategory: async (req, res, next) => {
    const { categoryId } = req.value.params;
    const { deviceId } = req.value.params;
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

    res.status(201).json(category);
  }
};
