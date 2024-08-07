const express = require('express');
const { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { validateObjectId } = require('../middlewares/validateObjectId');

const routerCategory = express.Router();

// /api/v1/categories
routerCategory.route('/')
  .post(createCategory)
  .get(getAllCategories)

routerCategory.route('/:id')
  .get(validateObjectId ,getSingleCategory)
  .patch(validateObjectId ,updateCategory)
  .delete(validateObjectId ,deleteCategory)

module.exports = {
  routerCategory,
};