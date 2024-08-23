import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

/**------------------------------------------------
 * @desc    Check on name when create a new category
 * @router  /api/categories
--------------------------------------------------*/
const createCategoryValidator = [
  check('name')
    .trim().notEmpty().withMessage('Category required')
    .isLength({ min: 3 }).withMessage('Too short category name')
    .isLength({ max: 32 }).withMessage('Too long category name'),
    validatorMiddleware
]

/**------------------------------------------------
 * @desc    Check on id when get single category
 * @router  /api/categories/:id
--------------------------------------------------*/
const getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id'),
  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on id when update category
 * @router  /api/categories/:id
--------------------------------------------------*/
const updateCategoryValidator = [
  check('id')
    .isMongoId().withMessage('Invalid category id'),

  check('name')
    .trim().notEmpty().withMessage('Category required')
    .isLength({ min: 3 }).withMessage('Too short category name')
    .isLength({ max: 32 }).withMessage('Too long category name'),

  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on id when delete category
 * @router  /api/categories/:id
--------------------------------------------------*/
const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id'),
  validatorMiddleware 
]

export { createCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator };