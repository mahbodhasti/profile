// مسیر: src/lib/models/Post.ts
import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  image: String,
  video: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
