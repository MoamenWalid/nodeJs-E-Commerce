import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

/**------------------------------------------------
 * @desc    Check on { name, category } when create a new subCategory
 * @router  /api/subcategories
--------------------------------------------------*/
const createSubCategoryValidator = [
  check('name')
    .trim().notEmpty().withMessage('SubCategory required')
    .isLength({ min: 2 }).withMessage('Too short subCategory name')
    .isLength({ max: 32 }).withMessage('Too long subCategory name'),

  check('category')
    .isMongoId().withMessage('Invalid category id'),

  validatorMiddleware
]

/**------------------------------------------------
 * @desc    Check on id when get single subCategory
 * @router  /api/subcategories/:id
--------------------------------------------------*/
const getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id'),
  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on { id } req.params, { name, category } req.body when update subCategory
 * @router  /api/subcategories/:id
--------------------------------------------------*/
const updateSubCategoryValidator = [
  check('id')
    .isMongoId().withMessage('Invalid subCategory id'),

  check('name')
    .trim().notEmpty().withMessage('Subcategory required')
    .isLength({ min: 3 }).withMessage('Too short subCategory name')
    .isLength({ max: 32 }).withMessage('Too long subCategory name'),

  check('category')
  .notEmpty().withMessage('Category id required')
    .isMongoId().withMessage('Invalid category id'),

  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on id when delete subCategory
 * @router  /api/subcategories/:id
--------------------------------------------------*/
const deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id'),
  validatorMiddleware 
]

export { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator };