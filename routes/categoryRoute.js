import express from 'express';
import { createCategoryCtrl, deleteSingleCategory, getAllCategories, getSingleCategory, updateSingleCategory } from '../controllers/categoryCtrl.js';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validators/categoryValidator.js';

const categoryRoute = express.Router();

// /api/categories
categoryRoute.route('/')
  .post(createCategoryValidator, createCategoryCtrl)
  .get(getAllCategories)

// /api/categories/:id
categoryRoute.route('/:id')
  .get(getCategoryValidator, getSingleCategory)
  .patch(updateCategoryValidator, updateSingleCategory)
  .delete(deleteCategoryValidator, deleteSingleCategory)

export { categoryRoute };