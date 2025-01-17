import mongoose from 'mongoose';

const articleInfoSchema = new mongoose.Schema({
  primaryId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortTitle: { type: String, required: true },
  shortDesc: { type: String, required: true },
  LongDesc: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});


export const ArticleInfo = mongoose.model("ArticleInfo", articleInfoSchema);
