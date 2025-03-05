import { Router } from "express";
import {
  getCategories,
  createCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";
import { get } from "mongoose";
const router = Router();

router.route("/").get(getCategories).post(createCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;

