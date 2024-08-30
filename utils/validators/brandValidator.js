import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

/**------------------------------------------------
 * @desc    Check on name when create a new brand
 * @router  /api/categories
--------------------------------------------------*/
const createBrandValidator = [
  check('name')
    .trim().notEmpty().withMessage('Brand required')
    .isLength({ min: 3 }).withMessage('Too short brand name')
    .isLength({ max: 32 }).withMessage('Too long brand name'),
    validatorMiddleware
]

/**------------------------------------------------
 * @desc    Check on id when get single brand
 * @router  /api/categories/:id
--------------------------------------------------*/
const getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid brand id'),
  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on id when update brand
 * @router  /api/categories/:id
--------------------------------------------------*/
const updateBrandValidator = [
  check('id')
    .isMongoId().withMessage('Invalid brand id'),

  check('name')
    .trim().notEmpty().withMessage('Brand required')
    .isLength({ min: 3 }).withMessage('Too short brand name')
    .isLength({ max: 32 }).withMessage('Too long brand name'),

  validatorMiddleware 
]

/**------------------------------------------------
 * @desc    Check on id when delete brand
 * @router  /api/categories/:id
--------------------------------------------------*/
const deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid brand id'),
  validatorMiddleware 
]


export { createBrandValidator, getBrandValidator, updateBrandValidator, deleteBrandValidator };