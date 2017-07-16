const router = require('express-promise-router')();

const buildingController =  require('../controllers/buildingController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(buildingController.allBuildings)
  .post(validateBody(schemas.buildingSchema), buildingController.newBuilding);

router.route('/:buildingId')
  .get(validateParam(schemas.idSchema, 'buildingId'), buildingController.getBuilding)
  .patch([validateParam(schemas.idSchema, 'buildingId'),
          validateBody(schemas.buildingSchema)],
          buildingController.updateBuilding)
  .delete(validateParam(schemas.idSchema, 'buildingId'),
          buildingController.removeBuilding);

router.route('/:buildingId/devices')
  .get(validateParam(schemas.idSchema, 'buildingId'), buildingController.getBuildingDevices);

router.route('/:buildingId/spaces')
  .get(validateParam(schemas.idSchema, 'buildingId'), buildingController.getBuildingSpaces);

router.route('/:buildingId/space/:spaceId')
  .post([validateParam(schemas.idSchema, 'buildingId'),
        validateParam(schemas.idSchema, 'spaceId')],
        buildingController.addSpaceToBuilding);

module.exports = router;
