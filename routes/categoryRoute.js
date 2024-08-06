const express = require('express');
const { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const routerCategory = express.Router();

// /api/v1/categories
routerCategory.route('/')
  .post(createCategory)
  .get(getAllCategories)

routerCategory.route('/:id')
  .get(getSingleCategory)
  .patch(updateCategory)
  .delete(deleteCategory)

module.exports = {
  routerCategory,
};