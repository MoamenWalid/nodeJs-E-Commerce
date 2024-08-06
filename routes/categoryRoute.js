const express = require('express');
const { createCategory, getAllCategories, getSingleCategory, updateCategory } = require('../controllers/categoryController');

const routerCategory = express.Router();

// /api/v1/categories
routerCategory.route('/')
  .post(createCategory)
  .get(getAllCategories)

routerCategory.route('/:id')
  .get(getSingleCategory)
  .patch(updateCategory)

module.exports = {
  routerCategory,
};