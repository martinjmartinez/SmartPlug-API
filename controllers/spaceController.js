const Device = require('../models/deviceModel');
const Space = require('../models/spaceModel');
const Building = require('../models/buildingModel');

module.exports = {
  allSpaces: async (req, res, next) => {
    const spaces = await Space.find({}).populate("devices");
    res.status(200).json(spaces);
  },

  newSpace: async (req, res, next) => {
    const new_space = new Space(req.value.body);
    const space = await new_space.save();
    res.status(201).json(space);
  },

  getSpace: async (req, res, next) => {
    const { spaceId } = req.value.params;
    const space = await Space.findById(spaceId).populate("devices");
    res.status(200).json(space);
  },

  updateSpace: async (req, res, next) => {
    const {spaceId} = req.value.params;
    const new_space = req.value.body;
    const result = await Space.findByIdAndUpdate(spaceId, new_space);
    res.status(200).json({ success: true});
  },

  getSpaceDevices: async (req, res, next) => {
    const { spaceId}  = req.value.params;
    const space = await Space.findById(spaceId).populate("devices");

    res.status(200).json(space.devices)

  },

  addDeviceToSpace: async (req, res, next) => {
    const { spaceId } = req.value.params;
    const { deviceId } = req.value.params;
    //Create new space
    const space = await Space.findById(spaceId);
    //Get device
    const device = await Device.findById(deviceId);

    space.devices.push(device);
    //Save space
    await space.save();

    res.status(201).json(space);
  },

  removeSpace: async (req, res, next) => {
    const { spaceId } = req.value.params;
    //Get device
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({error: 'Space doesn\'t exist'});
    }
    var building = await Building.findById(space.building);
    if (building) {
      building.spaces.pull(space);
    }
    var devices = await Device.find({space: spaceId});
    if (devices) {
      for (i = 0; i<devices.length; i++) {
        devices[i].space = null;
        await devices[i].save();
      }
    }

    await building.save();
    await space.remove();

    res.status(200).json({ success: true});
  }
};
