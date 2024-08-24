import express from 'express';
import { createSubCategoryCtrl } from '../controllers/subCategoryCtrl.js';
import { createSubCategoryValidator } from '../utils/validators/subCategoryValidator.js';

const subCategoryRoute = express.Router();

// /api/subcategories
subCategoryRoute.route('/')
  .post(createSubCategoryValidator, createSubCategoryCtrl)

export { subCategoryRoute };