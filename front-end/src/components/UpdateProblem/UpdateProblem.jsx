import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./update-problem.scss";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UpdateProblem = () => {
  const { problemList } = useSelector((state) => state);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [problemName, setProblemName] = React.useState("");
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);
  const [showProblemEditSpace, setShowProblemEditSpace] = useState(false);
  const [formData, setFormData] = useState({
    problemName: "",
    problemDescription: "",
    starterCode: "",
    difficulty: "Easy",
    examples: "",
    testcases: "",
    solution: "",
  });

  const handleSelectChange = (event) => {
    setProblemName(event.target.value);

    let prob = problemList.filter(
      (problem) => problem.title === event.target.value
    )[0];

    console.log("*********************", prob);

    setSelectedProblem(prob);

    setFormData({
      problemName: prob.title,
      problemDescription: prob.description,
      starterCode: prob.starter_code,
      difficulty: prob.difficulty,
      examples: JSON.stringify(prob.examples),
      testcases: JSON.stringify(prob.test_cases),
      solution: prob.solution,
    });

    setShowUpdateOptions(true);
  };

  console.log("ffff", formData);

  const handleUpdateSpace = () => {
    setShowProblemEditSpace(true);
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    if (name.match("problemName")) {
      setFormData({ ...formData, [name]: value });
    } else if (name.match("problemDescription")) {
      setFormData({ ...formData, [name]: value });
    } else if (name.match("difficulty")) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [difficulty, setDifficulty] = useState("Easy");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStarterCodeChange = (editorValue) => {
    setFormData({ ...formData, starterCode: editorValue });
  };

  const handleSolutionChange = (editorValue) => {
    setFormData({ ...formData, solution: editorValue });
  };

  const handleExamplesChange = (editorValue) => {
    setFormData({ ...formData, examples: editorValue });
  };

  const handleTestCasesChange = (editorValue) => {
    setFormData({ ...formData, testcases: editorValue });
  };

  const { userData } = useSelector((state) => state.userData);

  console.log("ssssss", JSON.stringify(selectedProblem.examples));
  console.log("ssttttt", selectedProblem);
  console.log("ssttttt", selectedProblem.starter_code);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.starterCode && formData.examples && formData.testcases) {
      let problemData = {
        title: formData.problemName,
        description: formData.problemDescription,
        starter_code: formData.starterCode,
        difficulty: formData.difficulty,
        examples: formData.examples,
        test_cases: formData.testcases,
        solution: formData.solution,
      };
      axios
        .put(
          `http://localhost:8000/problems/${selectedProblem._id}`,
          problemData
        )
        .then((res) => {
          console.log(res.data);
          setShowProblemEditSpace(false);
          setShowUpdateOptions(false);
          setFormData({
            problemName: "",
            problemDescription: "",
            starterCode: "",
            difficulty: "Easy",
            examples: "",
            solution: "",
            testcases: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/problems/${selectedProblem._id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        setShowUpdateOptions(false);
        setShowProblemEditSpace(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [showUpdateOptions]);

  return (
    <>
      <div className="up-cont">
        <div className="up-cont-b1">
          <h3>Update Problem</h3>
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select
              displayEmpty
              value={problemName}
              onChange={handleSelectChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Problem</em>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Select Problem</em>
              </MenuItem>
              {problemList.map((problem) => (
                <MenuItem key={problem._id} value={problem.title}>
                  {problem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {showUpdateOptions ? (
            <div className="up-cont-b3">
              <h3>Selected Problem: {problemName}</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateSpace}
              >
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          ) : (
            ""
          )}
          {showProblemEditSpace ? (
            <>
              <div className="up-cont-b4">
                <div className="setproblem-container up-cont-fix2">
                  <div className="setproblem-content-container up-cont-fix1">
                    <form
                      className="setproblem-form"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="setproblem-block-1">
                        <div className="setproblem-block-1a">
                          <TextField
                            id="outlined-basic"
                            label="Problem Name"
                            name="problemName"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                            value={formData.problemName}
                            onChange={handleFormDataChange}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Problem Description"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={18}
                            name="problemDescription"
                            value={formData.problemDescription}
                            onChange={handleFormDataChange}
                          />
                        </div>
                        <div className="setproblem-block-1b">
                          <h4>Starter Code</h4>
                          <Editor
                            height="480px"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={formData.starterCode}
                            onChange={handleStarterCodeChange}
                            options={{
                              fontSize: 15,
                              wordWrap: "on",
                              automaticLayout: true,
                              scrollBeyondLastLine: false,
                            }}
                          />
                        </div>
                      </div>
                      <div className="setproblem-block-2">
                        <FormControl>
                          <InputLabel id="demo-simple-select-label">
                            Difficulty
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.difficulty}
                            label="Difficulty"
                            onChange={handleFormDataChange}
                            name="difficulty"
                            required
                            style={{ width: "33.5rem" }}
                          >
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="setproblem-block-3">
                        <div className="setproblem-block-3a">
                          <div className="setproblem-examples">
                            <h4>Examples</h4>
                          </div>
                          <div className="setproblem-examples-div">
                            <Editor
                              height="300px"
                              defaultLanguage="javascript"
                              theme="vs-dark"
                              value={formData.examples}
                              onChange={handleExamplesChange}
                              options={{
                                fontSize: 15,
                                wordWrap: "on",
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                              }}
                              className="test-case-editor"
                            />
                          </div>
                        </div>
                        <div className="setproblem-block-3b">
                          <div className="setproblem-examples">
                            <h4>Test Cases</h4>
                          </div>
                          <div className="setproblem-examples-div">
                            <Editor
                              height="300px"
                              defaultLanguage="javascript"
                              theme="vs-dark"
                              value={formData.testcases}
                              onChange={handleTestCasesChange}
                              options={{
                                fontSize: 15,
                                wordWrap: "on",
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                              }}
                              className="test-case-editor"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="setproblem-block-4">
                        <div className="setproblem-block-4a">
                          <h4>Solution</h4>
                          <Editor
                            height="480px"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={formData.solution}
                            onChange={handleSolutionChange}
                            options={{
                              fontSize: 15,
                              wordWrap: "on",
                              automaticLayout: true,
                              scrollBeyondLastLine: false,
                            }}
                          />
                        </div>
                      </div>
                      <div className="setproblem-block-4">
                        <Button variant="contained" type="submit" fullWidth>
                          Submit
                        </Button>
                      </div>
                    </form>
                    <div className="increase-bottom-padding"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProblem;
