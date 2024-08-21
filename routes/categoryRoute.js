import express from 'express';
import { createCategoryCtrl } from '../controllers/categoryController.js';

const categoryRoute = express.Router();

// /api/categories
categoryRoute.route('/')
  .post(createCategoryCtrl);

export { categoryRoute };