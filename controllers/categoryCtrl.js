import { Category } from "../models/Category.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { ApiError } from "../utils/ApiError.js";

/**-----------------------------------------
 * @desc    Create a new Category
 * @router  /api/categories
 * @req     { name } req.body
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/
const createCategoryCtrl = asyncHandler(async(req, res, next) => {
  const { name } = req.body;

  // Check if category is exists or not
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) return next(new ApiError('This category already exists', 403));

  // Create a new category
  const category = await Category.create({
    name,
    slug: slugify(name)
  })

  if (!category) return next(new ApiError('Not created, try again, later', 424))
  res.status(201).json(category);
})

/**-----------------------------------------
 * @desc    Get all categories
 * @router  /api/categories
 * @req     { page, limit } req.query @optional
 * @method  GET
 * @access  public
------------------------------------------*/
const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page: +page, categories });
})

/**-----------------------------------------
 * @desc    Get single category
 * @router  /api/categories/:id
 * @req     { id } req.params
 * @method  GET
 * @access  public
------------------------------------------*/
const getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new ApiError(`Not found any category by this id ${ id }`));

  res.status(200).json({ data: category });
})

/**-----------------------------------------
 * @desc    Update single category
 * @router  /api/categories/:id
 * @req     { id } req.params, { name } req.body @optional
 * @method  PATCH
 * @access  private
------------------------------------------*/
const updateSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  // Check if category exsists or not
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) return next(new ApiError('This category already exists', 403));

  const category = await Category.findByIdAndUpdate(id, {
    name,
    slug: slugify(name)
  }, { new: true })

  if (!category) return next(new ApiError(`Not found any category by this id ${ id }`));

  res.status(200).json({ data: category });
})

/**-----------------------------------------
 * @desc    Delete single category
 * @router  /api/categories/:id
 * @req     { id } req.params
 * @method  DELETE
 * @access  private
------------------------------------------*/
const deleteSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return next(new ApiError(`Not found any category by this id ${ id }`));

  res.status(200).json({ message: "Deleted successfully" });
})

export { createCategoryCtrl, getAllCategories, getSingleCategory, updateSingleCategory, deleteSingleCategory };