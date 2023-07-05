import * as solutionService from "../services/solution.service.js";
import * as submissionController from "./submission.controller.js";
import fs from "fs";
import spawn from "child_process";
import _ from "lodash";

export const solution = async (req, res, next) => {
  try {
    const { userData, problem, code } = req.body;

    const TIMEOUT = 20000; // 20 seconds

    // const result = await solutionService.solution(problem, code);

    fs.createWriteStream("code.js").write(JSON.parse(code));

    // const compilationCheck = spawn.spawn("node", ["-c", "code.js"]);

    // compilationCheck.stdout.on("data", (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    // compilationCheck.stderr.on("data", (data) => {
    //   console.error(`stderr: ${data}`);
    // });

    // compilationCheck.on("close", (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });

    // problem.test_cases.map((test_case) => {
    //   let inputs = [];
    //   for (let key in test_case.input) {
    //     inputs.push(test_case.input[key]);
    //   }
    //   // const process = spawn.spawn("node", [
    //   //   "code.js",
    //   //   problem.test_cases[0].input.nums,
    //   //   problem.test_cases[0].input.target,
    //   // ]); // pass arguments here

    //   const process = spawn.spawn("node", ["code.js", ...inputs]); // pass arguments here

    //   let output = "";

    //   const timeoutId = setTimeout(() => {
    //     process.kill();
    //     res.status(500).send("Timeout exceeded");
    //   }, TIMEOUT);

    //   process.stdout.on("data", (data) => {
    //     console.log("on data");
    //     console.log(`stdout: ${data}`);
    //     codeOutputs.push(JSON.parse(data.toString().replace("\n", "")));
    //     output = data;
    //     res.status(200).json({ result: data.toString().replace("\n", "") });
    //   });

    //   process.stderr.on("data", (data) => {
    //     console.error(`stderr: ${data}`);
    //   });

    //   process.on("exit", (code) => {
    //     console.log("on exit");
    //     console.log(`child process exited with code ${code}`);
    //     console.log(`Output: ${output}`);
    //     console.log(output.toString());
    //     console.log(
    //       typeof problem.test_cases[0].output,
    //       typeof JSON.parse(output.toString().replace("\n", ""))
    //     );
    //     console.log(
    //       problem.test_cases[0].output.toString(),
    //       JSON.parse(output.toString().replace("\n", ""))
    //     );

    //     console.log(
    //       _.isEqual(
    //         problem.test_cases[0].output,
    //         JSON.parse(output.toString().replace("\n", ""))
    //       )
    //     );

    //     if (
    //       _.isEqual(
    //         problem.test_cases[0].output,
    //         JSON.parse(output.toString().replace("\n", ""))
    //       )
    //     ) {
    //       console.log("output matched");
    //     } else {
    //       console.log("not matched");
    //     }
    //     clearTimeout(timeoutId);
    //   });
    // });

    // res.send("ok");
    // const result = solutionService.solution(problem, code);
    const runTestCase = (inputs, expectedOutput, testcaseInput) => {
      return new Promise((resolve, reject) => {
        const process = spawn.spawn("node", ["code.js", ...inputs]); // pass arguments here

        let output = "";

        const timeoutId = setTimeout(() => {
          process.kill();
          reject(new Error("Timeout exceeded"));
        }, TIMEOUT);

        process.stdout.on("data", (data) => {
          console.log(`stdout: ${data}`);
          output = data;
        });

        process.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
        });

        process.on("exit", (code) => {
          console.log(`child process exited with code ${code}`);
          if (output.toString().replace("\n", "").match("undefined")) {
            clearTimeout(timeoutId);
            resolve({
              input: testcaseInput,
              expectedOutput: expectedOutput,
              output: output.toString().replace("\n", ""),
              isOutputMatched: false,
            });
          } else {
            console.log(`Output: ${output}`);
            console.log(output.toString());
            console.log(
              typeof expectedOutput,
              typeof JSON.parse(output.toString().replace("\n", ""))
            );
            console.log(
              expectedOutput,
              JSON.parse(output.toString().replace("\n", ""))
            );

            console.log(
              _.isEqual(
                expectedOutput,
                JSON.parse(output.toString().replace("\n", ""))
              )
            );

            const isOutputMatched = _.isEqual(
              expectedOutput,
              JSON.parse(output.toString().replace("\n", ""))
            );
            clearTimeout(timeoutId);
            resolve({
              input: testcaseInput,
              expectedOutput: expectedOutput,
              output: JSON.parse(output.toString().replace("\n", "")),
              isOutputMatched: isOutputMatched,
            });
          }
        });
      });
    };

    const promises = problem.test_cases.map((test_case) => {
      let inputs = [];
      for (let key in test_case.input) {
        inputs.push(test_case.input[key]);
      }
      return runTestCase(inputs, test_case.output, test_case.input);
    });

    Promise.all(promises)
      .then((results) => {
        console.log(results);
        let status = "";
        results.map((result) => {
          if (!result.isOutputMatched) {
            status = "Wrong Answer";
            return;
          }
          status = "Accepted";
          return;
        });
        const submission = submissionController.submission(
          userData,
          problem,
          code,
          {
            results: results,
            status: status,
          }
        );
        submission.then((value) =>
          res
            .status(200)
            .json({ results: results, status: status, submission: value })
        );
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error.message);
      });
  } catch (error) {
    console.log(error);
  }
};
