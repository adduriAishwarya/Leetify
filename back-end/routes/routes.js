import express from "express";

import * as userController from "../controllers/user.controller.js";
import * as problemController from "../controllers/problem.controller.js";
import * as solutionController from "../controllers/solution.controller.js";
import * as submissionController from "../controllers/submission.controller.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).send("healthcheck ok!");
});

router.post("/signup", userController.createUser);
router.post("/signin", userController.loginUser);
router.put("/users/:id", userController.updateUser);

router.get("/protected", userController.verifyToken, (req, res) => {
  // This route is protected and can only be accessed with a valid token
  res.json({ message: "Protected route" });
});

/*Problem routes*/

router.post(
  "/problems",
  userController.verifyToken,
  problemController.createProblem
);
router.get("/problems", problemController.getProblems);
router.put("/problems/:id", problemController.updateProblem);
router.delete("/problems/:id", problemController.deleteProblem);

/**submission routes */
router.post("/solutions", solutionController.solution);
router.get(
  "/solutions/:userId/:problemId",
  submissionController.getAllSubmission
);
router.get(
  "/group-submission-count/:userId",
  submissionController.getProblemsSolvedUnique
);
router.get(
  "/getAllUserSumbissions/:userId",
  submissionController.getAllUserSubmission
);

router.get("/submissions", submissionController.getAllSubmissions);

router.get("/users", userController.getAllUsers);

export default router;
