import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { ApiError } from "../utils/ApiError.js";
import { Brand } from "../models/Brand.js";

/**-----------------------------------------
 * @desc    Create a new Brand
 * @router  /api/brands
 * @req     { name } req.body
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/
const createBrand = asyncHandler(async(req, res, next) => {
  const { name } = req.body;

  // Check if brand is exists or not
  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) return next(new ApiError('This Brand already exists', 403));

  // Create a new brand
  const brand = await Brand.create({
    name,
    slug: slugify(name)
  })

  if (!brand) return next(new ApiError('Not created, try again, later', 424))
  res.status(201).json(brand);
})


/**-----------------------------------------
 * @desc    Get all brands
 * @router  /api/brands
 * @req     { page, limit } req.query @optional
 * @method  GET
 * @access  public
------------------------------------------*/
const getAllBrands = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page: +page, brands });
})

/**-----------------------------------------
 * @desc    Get single brand
 * @router  /api/brands/:id
 * @req     { id } req.params
 * @method  GET
 * @access  public
------------------------------------------*/
const getSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) return next(new ApiError(`Not found any brand by this id ${ id }`));

  res.status(200).json({ data: brand });
})

/**-----------------------------------------
 * @desc    Update single brand
 * @router  /api/brands/:id
 * @req     { id } req.params, { name } req.body @optional
 * @method  PATCH
 * @access  private
------------------------------------------*/
const updateSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  // Check if brand exsists or not
  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) return next(new ApiError('This brand already exists', 403));

  const brand = await Brand.findByIdAndUpdate(id, {
    name,
    slug: slugify(name)
  }, { new: true })

  if (!brand) return next(new ApiError(`Not found any brand by this id ${ id }`));

  res.status(200).json({ data: brand });
})

/**-----------------------------------------
 * @desc    Delete single brand
 * @router  /api/categories/:id
 * @req     { id } req.params
 * @method  DELETE
 * @access  private
------------------------------------------*/
const deleteSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) return next(new ApiError(`Not found any brand by this id ${ id }`));

  res.status(200).json({ message: "Deleted successfully" });
})
export { createBrand, getAllBrands, getSingleBrand, updateSingleBrand, deleteSingleBrand };