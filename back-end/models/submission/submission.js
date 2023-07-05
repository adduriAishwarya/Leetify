import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  results: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
