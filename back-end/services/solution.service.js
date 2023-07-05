import Problem from "../models/problem/index.js";
import fs from "fs";
import spawn from "child_process";

export const solution = async (problem, code) => {
  try {
    // const problemToSolve = await Problem.findById({ id: problem._id });

    fs.createWriteStream("code.js").write(JSON.parse(code));

    const compilationCheck = spawn.spawn("node", ["-c", "code.js"]);

    compilationCheck.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    compilationCheck.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    compilationCheck.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });

    const process = spawn.spawn("node", [
      "code.js",
      problem.test_cases[0].input.nums,
      problem.test_cases[0].input.target,
    ]); // pass arguments here

    let output = "";

    process.stdout.on("data", (data) => {
      console.log("here");
      console.log(`stdout: ${data}`);
      output = data;
    });

    process.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    process.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      console.log(`Output: ${output}`);
      console.log(output.toString());
      console.log(
        typeof problem.test_cases[0].output,
        typeof output.toString()
      );
      console.log(problem.test_cases[0].output.toString(), output.toString());
      if (problem.test_cases[0].output.toString().match(output.toString())) {
        console.log("output matched");
      } else {
        console.log("not matched");
      }
    });

    return output.toString();
  } catch (error) {
    console.log(error);
  }
};
