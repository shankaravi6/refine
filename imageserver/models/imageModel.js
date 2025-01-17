import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
  primaryId: {type: String, required: true, unique: true,},
  imgName: { type: String, required: true },
  imgPath : { type: String, required: true },
  date: { type: Date, default: Date.now },

});

// Create the model
export const ArticleImg = mongoose.model("ArticleImg", imgSchema);
