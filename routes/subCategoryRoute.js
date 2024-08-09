const express = require('express');
const {
  createSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory, deleteSubCategory
} = require('../controllers/subCategoryController');
const { validateObjectId } = require('../middlewares/validateObjectId');

const routerSubCategory = express.Router();

// /api/v1/subcategories
routerSubCategory.route('/')
  .post(createSubCategory)
  .get(getAllSubCategories)

// /api/v1/subcategories:id
routerSubCategory.route('/:id')
  .get(validateObjectId, getSingleSubCategory)
  .patch(validateObjectId, updateSubCategory)
  .delete(validateObjectId, deleteSubCategory)

module.exports = {
  routerSubCategory,
};