import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image:String
  },
  { timestamps: true }
);
// model for db
const CategoryModel = model("category", categorySchema);

export default CategoryModel;
