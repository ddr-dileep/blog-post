import mongoose, { Document, Schema } from "mongoose";
import { generateSlug } from "../utils/slug";

interface ICategory extends Document {
  name: string;
  slug: string;
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});

// Pre-save middleware to generate slug from name
categorySchema.pre("save", function (next) {
  const category = this as unknown as ICategory;

  if (!category.slug && category.name) {
    category.slug = generateSlug(category.name);
  }

  next();
});

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);
export default CategoryModel;
