const Device = require('../models/deviceModel');
const Space = require('../models/spaceModel');
const Building = require('../models/buildingModel');

module.exports = {
  allBuildings: async (req, res, next) => {
    const building = await Building.find({}).populate('spaces devices');
    res.status(200).json(building);
  },

  newBuilding: async (req, res, next) => {
    const new_building = new Building(req.value.body);
    const building = await new_building.save();
    res.status(201).json(building);
  },

  getBuilding: async (req, res, next) => {
    const { buildingId } = req.value.params;
    const building = await Building.findById(buildingId).populate({path: 'spaces', populate: {path: "devices", model: "device"}});

    res.status(200).json(building);
  },

  updateBuilding: async (req, res, next) => {
    const { buildingId } = req.value.params;
    const new_building = req.value.body;
    const result = await Building.findByIdAndUpdate(buildingId, new_building);
    res.status(200).json({ success: true});
  },

//TODO
  getBuildingDevices: async (req, res, next) => {
    const { buildingId }  = req.value.params;
    const building = await Building.findById(buildingId).populate('devices');

    res.status(200).json(building.devices)

  },

  getBuildingSpaces: async (req, res, next) => {
    const { buildingId }  = req.value.params;
    const building = await Building.findById(buildingId).populate({path: 'spaces', populate: {path: "devices", model: "device"}});

    res.status(200).json(building.spaces)

  },

  addSpaceToBuilding: async (req, res, next) => {
    const { buildingId } = req.value.params;
    const { spaceId } = req.value.params;
    //Create new space
    const space = await Space.findById(spaceId);
    //Get device
    const building = await Building.findById(buildingId);
    //Add building to the space
    space.building = building;
    //Save space
    await space.save();
    //Add space to building
    building.spaces.push(space);
    //Save space
    await building.save();

    res.status(201).json(building);
  },

  removeBuilding: async (req, res, next) => {
    const { buildingId } = req.value.params;
    const building = await Building.findById(buildingId);

    if (!building) {
      return res.status(404).json({error: 'Building doesn\'t exist'});
    }
    //Remove device
    if (!building.spaces || building.spaces.length == 0) {
      await building.remove();
    } else {
      return res.status(404).json({error: 'Building cant be removed. Still have spaces'});
    }

    res.status(200).json({ success: true});
  }
};
