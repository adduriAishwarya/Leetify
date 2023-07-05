import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Skeleton,
  StyledEngineProvider,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import SubmitResult from "../SubmitResult/SubmitResult";
import "./code-editor.scss";
// starter code from the state object using useEffect
const CodeEditor = () => {
  const state = useSelector((state) => state);

  const [editorCodeValue, seteditorCodeValue] = useState("");

  useEffect(() => {
    seteditorCodeValue(state.selectedProblem.starter_code);
  }, []);

  const dispatch = useDispatch();
  const [runResults, setRunResults] = useState("");
  const [submitResults, setSubmitResults] = useState({});
  const [shouldShowSkeleton, setShouldShowSkeleton] = useState(false);
  const [showRunResults, setShowRunResults] = useState(false);
  const [showSubmitResults, setShowSubmitResults] = useState(false);

  function onChange(newValue) {
    console.log(newValue);
    console.log(JSON.stringify(newValue));
    seteditorCodeValue(newValue);
  }
//Handle Run 
  function handleRun() {
    setShowRunResults(true);
    setShowSubmitResults(false);
    setShouldShowSkeleton(true);
    console.log(editorCodeValue);
    console.log(typeof editorCodeValue);
    const data = {
      problem: state.selectedProblem,
      code: JSON.stringify(editorCodeValue),
    };
    axios
      .post("http://localhost:8000/solutions", data)
      .then((res) => {
        console.log(res.data);
        setRunResults(res.data.result);
        setShouldShowSkeleton(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(state);
// Handle Submit 
  function handleSubmit() {
    setShowRunResults(false);
    setShouldShowSkeleton(true);

    const data = {
      userData: state.userData,
      problem: state.selectedProblem,
      code: JSON.stringify(editorCodeValue),
    };
    axios
      .post("http://localhost:8000/solutions", data)
      .then((res) => {
        console.log(res.data);
        setSubmitResults(res.data);
        setShowSubmitResults(true);
        setShouldShowSkeleton(false);
        if (res.data.status === "Accepted") {
          dispatch({ type: "ACCEPTED_SUBMISSION_STATUS" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <StyledEngineProvider injectFirst>
      {state.problemSubmissionStatus ? (
        <h3 className="code-editor-heading">Submission</h3>
      ) : (
        <h3 className="code-editor-heading">Code</h3>
      )}

      <Editor
        height="400px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={editorCodeValue}
        onChange={onChange}
        options={{
          fontSize: 15,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />

      <div>
        <div className="editor-bottom-container">
          <h3 className="heading-results">Results</h3>
          <div>
            <Button variant="contained" className="btn-run" onClick={handleRun}>
              Run
            </Button>
            <Button
              variant="contained"
              className="btn-submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
        <Container className="results-container">
          {showRunResults ? (
            runResults ? (
              <div>
                <h3>{runResults}</h3>
              </div>
            ) : shouldShowSkeleton ? (
              <>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </>
            ) : (
              ""
            )
          ) : showSubmitResults ? (
            <SubmitResult
              problem={state.selectedProblem}
              results={submitResults}
              showingSubmittedCode={false}
            />
          ) : shouldShowSkeleton ? (
            <>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </>
          ) : (
            ""
          )}
        </Container>
      </div>
    </StyledEngineProvider>
  );
};

export default CodeEditor;
