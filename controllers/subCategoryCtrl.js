import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { ApiError } from "../utils/ApiError.js";
import { SubCategory } from "../models/Subcategory.js";
import { Category } from "../models/Category.js";

/**-----------------------------------------
 * @desc    Create a new Subcategory
 * @router  /api/subcategories
 * @req     { name, category: mongoID } req.body
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/
const createSubCategoryCtrl = asyncHandler(async(req, res, next) => {
  const { name, category } = req.body;

  // Check if category is exists or not
  const existingCategory = await Category.findById(category);
  if (!existingCategory) return next(new ApiError('This category is not exists', 404));

  // Check if category is exists or not
  const existingSubCategory = await SubCategory.findOne({ name });
  if (existingSubCategory) return next(new ApiError('This subcategory already exists', 403));

  // Create a new subCategory
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category
  })

  if (!subCategory) return next(new ApiError('Not created, try again, later', 424))
  res.status(201).json(subCategory);
})

export { createSubCategoryCtrl };