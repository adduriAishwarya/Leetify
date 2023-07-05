import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  starter_code: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  examples: [
    {
      type: Object,
      required: true,
    },
  ],
  test_cases: [
    {
      input: {
        type: Object,
        required: true,
      },
      output: {
        type: Object,
        required: true,
      },
    },
  ],
  solution: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lastModified_at: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
