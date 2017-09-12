const router = require('express-promise-router')();

const historyController =  require('../controllers/historyController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(historyController.allHistories);

router.route('/device/:deviceId')
    .post(historyController.newHistory);

router.route('/:historyId')
  .get(validateParam(schemas.idSchema, 'historyId'), historyController.getHistory)
  .patch([validateParam(schemas.idSchema, 'historyId'),
          validateBody(schemas.historySchema)],
          historyController.updateHistory);

router.route('/:historyId/device/:deviceId')
  .post([validateParam(schemas.idSchema, 'historyId'),
        validateParam(schemas.idSchema, 'deviceId')],
        historyController.addHistoryToDevice);

module.exports = router;
