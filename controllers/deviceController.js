const Device = require('../models/deviceModel');
const Space = require('../models/spaceModel');

module.exports = {
  allDevices: async (req, res, next) => {
    const devices = await Device.find({}).populate('space');

    res.status(200).json(devices);
  },

  newDevice: async (req, res, next) => {
    const new_device = new Device(req.value.body);
    const device = await new_device.save();
    res.status(201).json(device);
  },

  getDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    const device = await Device.findById(deviceId).populate('space');
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

  newDeviceSpace: async (req, res, next) => {
    const {deviceId} = req.value.params;
    //Create new space
    const new_space = new Space(req.value.body);
    //Get device
    const device = await Device.findById(deviceId);
    //Add space to the device
    device.space = new_space;
    //Save device
    await device.save();
    //Add device to space
    new_space.devices.push(device);
    //Save space
    await new_space.save();

    res.status(201).json(device);
  },

  addExistingSpaceToDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    const { spaceId } = req.value.params;
    //Create new space
    const space = await Space.findById(spaceId);
    //Get device
    const device = await Device.findById(deviceId);
    //Add space to the device
    var previousSpaceId = null;

    if(device.space != null){
      previousSpaceId = device.space;
      if (previousSpaceId != spaceId) {
        //Get previous space
        const previousSpace = await Space.findById(previousSpaceId);
        if (previousSpace) {
          //Remove device from previous space
          previousSpace.devices.pull(deviceId);
          await previousSpace.save();
        }
        //Add device to space
        space.devices.push(deviceId);
      }
    } else {
      //Add device to space
      space.devices.push(deviceId);
    }

    device.space = space;
    //Save device
    await device.save();
    await space.save()

    res.status(201).json(device);
  },

  removeSpaceFromDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    const { spaceId } = req.value.params;
    //Create new space
    const space = await Space.findById(spaceId);
    //Get device
    const device = await Device.findById(deviceId);
    //Add space to the device
    device.space = null;
    //Save device
    await device.save();
    //Remove device from space
    space.devices.pull(device);
    //Save space
    await space.save();

    res.status(200).json({ success: true});
  },

  removeDevice: async (req, res, next) => {
    const { deviceId } = req.value.params;
    //Get device
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({error: 'Device doesn\'t exist'});
    }
    //Add space to the device
    const spaceId = device.space;
    //Get space
    const space = await Space.findById(spaceId);
    //Remove device from space
    space.devices.pull(device);
    //Save space
    await space.save();
    //Remove device
    await device.remove();

    res.status(200).json({ success: true});
  }
};
