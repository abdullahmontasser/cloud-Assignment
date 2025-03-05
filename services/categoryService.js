import slugify from "slugify";
import CategoryModel from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";

export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.json({ results: categories.length, page, data: categories });
});
export const createCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res
    .status(201)
    .json({ data: category, message: "it's created successfully" });
});
export const getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid category ID: ${id}` });
  }
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.json({ data: category });
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid category ID: ${id}` });
  }

  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.json({ data: category });
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid category ID: ${id}` });
  }
  const category = await CategoryModel.findOneAndDelete({ _id: id });
  if (!category) {
    res.status(404).json({ message: `No category for this id ${id}` });
  }
  res.status(204).send();
});
