import mongoose from "mongoose";
import Submission from "../models/submission/submission.js";
import User from "../models/user/user.js";
import Problem from "../models/problem/problem.js";

export const submission = async (userData, problem, code, results) => {
  try {
    const user = await User.findById(userData.user._id);
    const submission = new Submission({
      user: new mongoose.Types.ObjectId(userData.user._id),
      problem: new mongoose.Types.ObjectId(problem._id),
      language: "JavaScript",
      code: code,
      results: results.results,
      status: results.status,
    });
    await submission.save();
    user.submisssions.push(submission);
    await user.save();

    return submission;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubmission = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const problemId = req.params.problemId;
    const submissions = await Submission.find({
      user: new mongoose.Types.ObjectId(userId),
      problem: new mongoose.Types.ObjectId(problemId),
    }).exec();
    res.status(200).json({ submissions: submissions });
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({});
    return res.status(200).json({ submissions: submissions });
  } catch (error) {
    console.log(error);
  }
};

export const getProblemsSolvedUnique = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    let uniqueProblems = await Promise.all(
      user.submisssions.map(async (submission) => {
        let getSubmission = await Submission.findById(submission._id);
        return getSubmission?.problem.toString();
      })
    );
    const problemSet = new Set(uniqueProblems);

    const problems = await Promise.all(
      Array.from(problemSet).map(async (problem) => {
        let returnProblem = await Problem.findById(problem);
        return returnProblem;
      })
    );

    res.status(200).json({
      results: problems,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserSubmission = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const problemId = req.params.problemId;

    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    let submissions = [];
    submissions = await Promise.all(
      user.submisssions.map(async (submission) => {
        let getSubmission = await Submission.findById(submission._id);
        submissions.push(getSubmission);
        let getProblem = await Problem.findById(getSubmission?.problem);

        // return getSubmission?.problem.toString();

        return {
          problemName: getProblem.title,
          submitted_at: getSubmission.created_at,
          language: getSubmission.language,
          difficulty: getProblem.difficulty,
          status: getSubmission.status,
        };
      })
    );

    res.status(200).json({
      results: submissions,
    });
  } catch (error) {
    console.log(error);
  }
};
