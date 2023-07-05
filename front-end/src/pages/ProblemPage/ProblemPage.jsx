import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import "./problem-page.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProblemSpace from "../../components/ProblemSpace/ProblemSpace";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Submission from "../../components/Submission/Submission";
import SubmissionCodePanel from "../../components/SubmissionCodePanel/SubmissionCodePanel";
import { Editor } from "@monaco-editor/react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProblemPage = () => {
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const onSuccessfulSubmission = () => {
    setValue(2);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { selectedProblem, problemSubmissionStatus, showSubmissionCodePanel } =
    useSelector((state) => state);

  useEffect(() => {
    if (problemSubmissionStatus) onSuccessfulSubmission();
  }, [problemSubmissionStatus]);

  return (
    <>
      <Navbar />
      <div className="problem-page-container">
        <div className="problem-page-left">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Problem" {...a11yProps(0)} />
                <Tab label="Solution" {...a11yProps(1)} />
                <Tab label="Submissions" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ProblemSpace selectedProblem={selectedProblem} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Editor
                height="500px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={selectedProblem.solution}
                options={{
                  fontSize: 15,
                  wordWrap: "on",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h2 style={{ marginBottom: "0.7rem" }}>Your Submissions</h2>
              <Submission />
            </TabPanel>
          </Box>
        </div>
        <div className="problem-page-right">
          {showSubmissionCodePanel.show ? (
            <SubmissionCodePanel />
          ) : (
            <CodeEditor />
          )}
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
