const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { Category, validateCateogry } = require("../models/categoryModels");
const { ApiError } = require('../middlewares/apiError');

/**-----------------------------------------
 * @desc    Create category
 * @router  /api/v1/categories/
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { error } = validateCateogry(req.body);

  if (error) return next(new ApiError(error.details[0].message, 400));

  // Check if category already exist
  const existingCategory = await Category.findOne({ name: name.trim() });
  if (existingCategory) return next(new ApiError("category already exist", 400));

  // Create a new category
  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: newCategory, message: "category created successfully" });
})


/**-----------------------------------------
 * @desc    Get all categories
 * @router  /api/v1/categories/
 * @method  GET
 * @access  public
------------------------------------------*/

exports.getAllCategories = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const allCategories = await Category.find({}).skip(skip).limit(limit || 5);
  return res.status(200).json({ results: allCategories.length, page, data: allCategories });
})


/**-----------------------------------------
 * @desc    Get single category
 * @router  /api/v1/categories/:id
 * @method  GET
 * @access  public
------------------------------------------*/

exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const singleCategory = await Category.findById(id);
  if (!singleCategory) return next(new ApiError('category not found', 404));
  res.status(200).json({ data: singleCategory });
})


/**-----------------------------------------
 * @desc    update category
 * @router  /api/v1/categories/:id
 * @method  PATCH
 * @access  private (only admin)
------------------------------------------*/

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { error } = validateCateogry(req.body);
  if (error) return next(new ApiError(error.details[0].message, 400));

  const category = await Category.findById(id);
  if (!category) return next(new ApiError('category not found', 404));

  // Check if category already exist
  const existingCategory = await Category.findOne({ name: name.trim() });
  if (existingCategory) return next(new ApiError("category already exist", 400));

  const updateCategory = await Category.findByIdAndUpdate(id, {
    $set: {
      name,
      slug: slugify(name)
    }
  }, { new: true })

  res.status(200).json({ data: updateCategory, message: 'category updated successfully' });
})


/**-----------------------------------------
 * @desc    delete category
 * @router  /api/v1/categories/:id
 * @method  DELETE
 * @access  private (only admin)
------------------------------------------*/

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if category is found or not
  const foundCategory = await Category.findById(id);
  if (!foundCategory) return next(new ApiError('category not found', 404));

  // Delete category
  const deleted = await Category.findByIdAndDelete(id);
  if (deleted) return res.status(200).json({ message: "category has been deleted successfully" });
})