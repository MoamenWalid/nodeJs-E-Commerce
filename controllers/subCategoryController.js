const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { Category, validateCateogry } = require("../models/categoryModels");
const { ApiError } = require('../middlewares/apiError');
const { SubCategory, validateSubCategory } = require('../models/subCategoryModel');
const { default: mongoose } = require('mongoose');

/**-----------------------------------------
 * @desc    Create subCategory
 * @router  /api/v1/subcategories/
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/

exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, categoryId } = req.body;
  // Validation
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return next(new ApiError('invalid id', 400));
  }
  const { error } = validateSubCategory(req.body);
  if (error) return next(new ApiError(error.details[0].message, 400));

  // Check if category and if subCategory already exists
  const [existingCategory, existingSubCategory] = await Promise.all([
    Category.findById(categoryId),
    SubCategory.findOne({ name })
  ])

  if (!existingCategory) return next(new ApiError("Category not found", 404));
  if (existingSubCategory) return next(new ApiError("SubCategory already exists", 409));

  // Create a new category
  const newSubCategory = await SubCategory.create({ name, slug: slugify(name), categoryId });
  res.status(201).json({ data: newSubCategory, message: "subCategory created successfully" });
})


/**-----------------------------------------
 * @desc    Get all subCategories
 * @router  /api/v1/subcategories/
 * @method  GET
 * @access  public
------------------------------------------*/

exports.getAllSubCategories = asyncHandler(async (req, res) => {
  const { page, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const allSubCategories = await SubCategory.find({}).skip(skip).limit(limit).populate('categoryId');
  return res.status(200).json({ results: allSubCategories.length, page, data: allSubCategories });
})


/**-----------------------------------------
 * @desc    Get single subCategory
 * @router  /api/v1/subcategories/:id
 * @method  GET
 * @access  public
------------------------------------------*/

exports.getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if subCategory found or not
  const singleSubCategory = await SubCategory.findById(id).populate('categoryId');
  if (!singleSubCategory) return next(new ApiError('subCategory not found', 404));

  res.status(200).json({ data: singleSubCategory });
})


/**-----------------------------------------
 * @desc    update subCategory
 * @router  /api/v1/subcategories/:id
 * @method  PATCH
 * @access  private (only admin)
------------------------------------------*/

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;

  // Validation
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return next(new ApiError('category invalid ID', 400));
  }

  if (!await SubCategory.findById(id)) {
    return next(new ApiError('subCategory not found', 400));
  }

  const { error } = validateSubCategory(req.body);
  if (error) return next(new ApiError(error.details[0].message, 400));

  // Check if category and if subCategory already exists
  const [existingCategory, existingSubCategory] = await Promise.all([
    Category.findById(categoryId),
    SubCategory.findOne({ name })
  ])

  if (!existingCategory) return next(new ApiError("category not found", 404));
  if (existingSubCategory) return next(new ApiError("subcategory already exists", 409));

  const updateSubCategory = await SubCategory.findByIdAndUpdate(id, {
    $set: {
      name,
      slug: slugify(name),
      categoryId
    }
  }, { new: true })

  res.status(200).json({ data: updateSubCategory, message: 'subcategory updated successfully' });
})


/**-----------------------------------------
 * @desc    delete subCategory
 * @router  /api/v1/subcategories/:id
 * @method  DELETE
 * @access  private (only admin)
------------------------------------------*/

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if subCategory is found or not
  const foundSubCategory = await SubCategory.findById(id);
  if (!foundSubCategory) return next(new ApiError('subCategory not found', 404));

  // Delete subCategory
  const deleted = await SubCategory.findByIdAndDelete(id);
  if (deleted) return res.status(200).json({ message: "category has been deleted successfully" });
})