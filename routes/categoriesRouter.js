const router = require('express-promise-router')();

const categoryController =  require('../controllers/categoryController');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(categoryController.allCategories)
  .post(validateBody(schemas.categorySchema), categoryController.newCategory);

router.route('/:categoryId')
  .get(validateParam(schemas.idSchema, 'categoryId'), categoryController.getCategory)
  .patch([validateParam(schemas.idSchema, 'categoryId'),
          validateBody(schemas.categorySchema)],
          categoryController.updateCategory);

router.route('/:categoryId/devices')
  .get(validateParam(schemas.idSchema, 'categoryId'), categoryController.getCategoryDevices);

router.route('/:categoryId/device/:deviceId')
  .post([validateParam(schemas.idSchema, 'categoryId'),
        validateParam(schemas.idSchema, 'deviceId')],
        categoryController.addDeviceToCategory);

module.exports = router;
