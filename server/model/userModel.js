import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  }
});

// Create the model
export const User = mongoose.model('User', userSchema);


