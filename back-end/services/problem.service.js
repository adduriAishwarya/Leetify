import Problem from "../models/problem/index.js";

export const createProblem = async (
  title,
  description,
  starter_code,
  difficulty,
  examples,
  test_cases,
  solution
) => {
  const existingProblem = await Problem.findOne({ title });
  if (existingProblem) {
    throw new Error("Problem already exists!");
  }

  console.log(description);
  console.log(typeof description);

  const problem = new Problem({
    title: title,
    description: description,
    starter_code: starter_code,
    difficulty: difficulty,
    examples: JSON.parse(examples),
    test_cases: JSON.parse(test_cases),
    solution: solution,
  });
  await problem.save();
  return problem;
};

export const getProblems = async () => {
  try {
    const problemList = await Problem.find({});
    return problemList;
  } catch (error) {
    console.log(error);
  }
};
