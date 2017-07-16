const router = require('express-promise-router')();

const spacesController =  require('../controllers/spaceController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(spacesController.allSpaces)
  .post(validateBody(schemas.spaceSchema), spacesController.newSpace);

router.route('/:spaceId')
  .get(validateParam(schemas.idSchema, 'spaceId'), spacesController.getSpace)
  .patch([validateParam(schemas.idSchema, 'spaceId'),
          validateBody(schemas.spaceSchema)],
          spacesController.updateSpace)
  .delete(validateParam(schemas.idSchema, 'spaceId'),
          spacesController.removeSpace);;

router.route('/:spaceId/devices')
  .get(validateParam(schemas.idSchema, 'spaceId'), spacesController.getSpaceDevices);

router.route('/:spaceId/device/:deviceId')
  .post([validateParam(schemas.idSchema, 'spaceId'),
        validateParam(schemas.idSchema, 'deviceId')],
        spacesController.addDeviceToSpace);

module.exports = router;
