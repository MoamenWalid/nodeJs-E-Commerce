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


/** @nested_route /api/categories/:categoryId/subcategories */
/**-----------------------------------------
 * @desc    Get all subCategories
 * @router  /api/subcategories
 * @req     { page, limit } req.query @optional
 * @method  GET
 * @access  public
------------------------------------------*/
const getAllSubCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const filterObject = {};
  if (req.params.categoryId) filterObject.category = req.params.categoryId;  

  const subCategories = await SubCategory.find(filterObject).skip(skip).limit(limit).populate('category', 'name');
  res.status(200).json({ results: subCategories.length, page: +page, subCategories });
})


/**-----------------------------------------
 * @desc    Get single subCategory
 * @router  /api/subcategories/:id
 * @req     { id } req.params
 * @method  GET
 * @access  public
------------------------------------------*/
const getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id);
  if (!subCategory) return next(new ApiError(`Not found any subCategory by this id ${ id }`));

  res.status(200).json({ data: subCategory });
})


/**-----------------------------------------
 * @desc    Update single subCategory
 * @router  /api/subcategories/:id
 * @req     { id } req.params, { name, category } req.body
 * @method  PATCH
 * @access  private
------------------------------------------*/
const updateSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  
  // Check if category exsists or not
  const existingSubCategory = await SubCategory.findOne({ name });
  if (existingSubCategory) return next(new ApiError('This subCategory already exists', 403));

  const subCategory = await SubCategory.findByIdAndUpdate(id, {
    name,
    slug: slugify(name),
    category
  }, { new: true })

  if (!subCategory) return next(new ApiError(`Not found any subCategory by this id ${ id }`));

  res.status(200).json({ data: subCategory });
})


/**-----------------------------------------
 * @desc    Delete single subCategory
 * @router  /api/subcategories/:id
 * @req     { id } req.params
 * @method  DELETE
 * @access  private
------------------------------------------*/
const deleteSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) return next(new ApiError(`Not found any subCategory by this id ${ id }`));

  res.status(200).json({ message: "Deleted successfully" });
})


export { createSubCategoryCtrl, getAllSubCategories, getSingleSubCategory, updateSingleSubCategory, deleteSingleSubCategory };