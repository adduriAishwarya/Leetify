import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_status: {
    required: true,
    type: String,
    enum: ["USER", "PREMIUM_USER", "ADMIN"],
  },
  submisssions: [
    {
      submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
