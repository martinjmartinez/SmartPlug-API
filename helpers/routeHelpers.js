const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({param: req['params'][name]},schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['params']){
          req.value['params'] = {};
        }

        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['body']){
          req.value['body'] = {};
        }
        req.value['body'] = result.value;
        next();
      }
    }
  },

  schemas: {
    deviceSchema: Joi.object().keys({
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      ip_address: Joi.string().required(),
      building: Joi.string().required(),
      isActive: Joi.string(),
      space: Joi.string(),
      powerAverage: Joi.number()
    }),

    deviceOptionalSchema: Joi.object().keys({
      name: Joi.string(),
      status: Joi.boolean(),
      ip_address: Joi.string(),
      building: Joi.string(),
      space: Joi.string(),
      powerAverage: Joi.number()
    }),

    spaceSchema: Joi.object().keys({
      name: Joi.string(),
      devices: Joi.array().items(Joi.string()),
      isActive: Joi.string(),
      building: Joi.string()
    }),

    buildingSchema: Joi.object().keys({
      name: Joi.string(),
      isActive: Joi.string(),
      spaces: Joi.array().items(Joi.string())
    }),

    historySchema: Joi.object().keys({
      device: Joi.string(),
      startDate: Joi.string(),
      endDate: Joi.string(),
      powerLog: Joi.array().items(Joi.number()),
      powerAverage: Joi.number()
    }),

    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    powerValueSchema: Joi.object().keys({
      param: Joi.number().required()
    })
  }
}
