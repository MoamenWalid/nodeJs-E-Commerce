import { Category } from "../models/Category.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

/**-----------------------------------------
 * @desc    Create a new Category
 * @router  /api/categories
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/
const createCategoryCtrl = asyncHandler(async(req, res) => {
  const { name } = req.body;
    const category = await Category.create({
      name,
      slug: slugify(name)
    })
  
    res.json(category);
})

export { createCategoryCtrl };