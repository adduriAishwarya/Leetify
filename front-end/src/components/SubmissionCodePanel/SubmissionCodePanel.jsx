import { Editor } from "@monaco-editor/react";
import { Container } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine";
import React from "react";
import { useSelector } from "react-redux";
import SubmitResult from "../SubmitResult/SubmitResult";
import "./submission-code-panel.scss";
//redux useSelector to get selected problem and display submission code panel
const SubmissionCodePanel = () => {
  const { selectedProblem, showSubmissionCodePanel } = useSelector(
    (state) => state
  );

  console.log(showSubmissionCodePanel);

  return (
    <StyledEngineProvider injectFirst>
      <h3 className="submission-code-panel-heading">Your Submitted Code</h3>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={JSON.parse(showSubmissionCodePanel.submission.code)}
        options={{
          fontSize: 15,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly: true,
        }}
      />
      <div>
        <div className="editor-bottom-container">
          <h3 className="heading-results">Results</h3>
        </div>
        <Container className="results-container">
          <SubmitResult
            problem={selectedProblem}
            results={showSubmissionCodePanel.submission}
            showingSubmittedCode={true}
          />
        </Container>
      </div>
    </StyledEngineProvider>
  );
};

export default SubmissionCodePanel;
