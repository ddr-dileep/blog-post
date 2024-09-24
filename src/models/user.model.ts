import mongoose, { Document, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    nickname: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    settings: [{ type: String }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  bio: string;
  nickname: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  posts: [{ type: Schema.Types.ObjectId; ref: "Blog" }];
  settings: [String];
}
