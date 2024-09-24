import mongoose, { Document, Schema } from "mongoose";
import { generateSlug } from "../utils/slug";

enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

const blogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    body: { type: String, required: true },
    tags: [{ type: String, required: true }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        reactionType: {
          type: String,
          enum: ["like", "dislike"],
          required: true,
        },
      },
    ],
    views: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: PostStatus,
      default: PostStatus.DRAFT,
    },
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
      },
    ],
    featuredImage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug from title
blogPostSchema.pre("save", function (next) {
  const post = this as unknown as IPost;

  if (!post.slug && post.title) {
    post.slug = generateSlug(post.title);
  }

  next();
});

const BlogModel = mongoose.model<IPost>("Blog", blogPostSchema);

export default BlogModel;

interface IComment {
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IReactions {
  userId: Schema.Types.ObjectId;
  reactionType: string;
}

interface IPost extends Document {
  title: string;
  slug: string;
  body: string;
  tags: string[];
  categories: Schema.Types.ObjectId[];
  reactions: IReactions[];
  views: number;
  userId: Schema.Types.ObjectId;
  status: PostStatus;
  comments: IComment[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}
