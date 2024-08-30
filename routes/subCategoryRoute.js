import express from 'express';
import { createSubCategoryCtrl, deleteSingleSubCategory, getAllSubCategories, getSingleSubCategory, updateSingleSubCategory } from '../controllers/subCategoryCtrl.js';
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from '../utils/validators/subCategoryValidator.js';

// mergeParams: Allow us to access parameters on other routers
const subCategoryRoute = express.Router({ mergeParams: true });

// /api/subcategories
subCategoryRoute.route('/')
  .post(createSubCategoryValidator, createSubCategoryCtrl)
  .get(getAllSubCategories)

// /api/subcategories/:id
subCategoryRoute.route('/:id')
  .get(getSubCategoryValidator, getSingleSubCategory)
  .patch(updateSubCategoryValidator, updateSingleSubCategory)
  .delete(deleteSubCategoryValidator, deleteSingleSubCategory)

export { subCategoryRoute };