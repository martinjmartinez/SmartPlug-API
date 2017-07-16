const router = require('express-promise-router')();

const deviceController =  require('../controllers/deviceController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(deviceController.allDevices)
  .post(validateBody(schemas.deviceSchema), deviceController.newDevice);

router.route('/:deviceId')
  .get(validateParam(schemas.idSchema, 'deviceId'), deviceController.getDevice)
  .put([validateParam(schemas.idSchema, 'deviceId'),
        validateBody(schemas.deviceSchema)],
        deviceController.replaceDevice)
  .patch([validateParam(schemas.idSchema, 'deviceId'),
          validateBody(schemas.deviceOptionalSchema)],
          deviceController.updateDevice)
  .delete([validateParam(schemas.idSchema, 'deviceId')],
          deviceController.removeDevice);

router.route('/:deviceId/space')
  .post([validateParam(schemas.idSchema, 'deviceId'),
        validateBody(schemas.spaceSchema)],
        deviceController.newDeviceSpace);


router.route('/:deviceId/space/:spaceId')
  .post([validateParam(schemas.idSchema, 'deviceId'),
        validateParam(schemas.idSchema, 'spaceId')],
        deviceController.addExistingSpaceToDevice)
  .delete([validateParam(schemas.idSchema, 'spaceId'),
        validateParam(schemas.idSchema, 'deviceId')],
        deviceController.removeSpaceFromDevice);


module.exports = router;
