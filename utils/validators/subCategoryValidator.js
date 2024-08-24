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

export { createSubCategoryValidator };