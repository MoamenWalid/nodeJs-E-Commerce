import express from 'express';
import { createBrand, deleteSingleBrand, getAllBrands, getSingleBrand, updateSingleBrand } from '../controllers/brandCtrl.js';
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from '../utils/validators/brandValidator.js';

const brandRoute = express.Router();

// /api/brands
brandRoute.route('/')
  .post(createBrandValidator, createBrand)
  .get(getAllBrands)

// /api/brands/:id
brandRoute.route('/:id')
  .get(getBrandValidator, getSingleBrand)
  .patch(updateBrandValidator, updateSingleBrand)
  .delete(deleteBrandValidator, deleteSingleBrand)

export { brandRoute };