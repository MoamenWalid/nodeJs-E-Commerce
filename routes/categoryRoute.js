import express from 'express';
import { createCategoryCtrl, deleteSingleCategory, getAllCategories, getSingleCategory, updateSingleCategory } from '../controllers/categoryController.js';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validators/categoryValidator.js';

const categoryRoute = express.Router();

// /api/categories
categoryRoute.route('/')
  .post(createCategoryValidator, createCategoryCtrl)
  .get(getAllCategories)

categoryRoute.route('/:id')
  .get(getCategoryValidator, getSingleCategory)
  .patch(updateCategoryValidator, updateSingleCategory)
  .delete(deleteCategoryValidator, deleteSingleCategory)

export { categoryRoute };