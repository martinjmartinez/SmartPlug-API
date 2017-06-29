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
          deviceController.updateDevice);

router.route('/:deviceId/category')
  .post([validateParam(schemas.idSchema, 'deviceId'),
        validateBody(schemas.categorySchema)],
        deviceController.newDeviceCategory);


router.route('/:deviceId/category/:categoryId')
  .post([validateParam(schemas.idSchema, 'deviceId'),
        validateParam(schemas.idSchema, 'categoryId')],
        deviceController.addExistingCategoryToDevice);


module.exports = router;
