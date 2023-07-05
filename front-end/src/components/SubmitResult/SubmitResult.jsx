import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StyledEngineProvider } from "@mui/styled-engine";
import "./submit-result.scss";
// render tab panel based on index props and value
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
//return accessibility props for a tab with index.
function a11yProps(index) {
  console.log("allyprops", index);
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
// handle submit result
const SubmitResult = ({ problem, results, showingSubmittedCode }) => {
  console.log(results);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// map testcases
  const mapInput = (test_case) => {
    let items = [];
    for (let key in test_case.input) {
      items.push(<h5>{`${key} = ${JSON.stringify(test_case.input[key])}`}</h5>);
    }
    return items;
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        {!showingSubmittedCode ? (
          <>
            <div className="result-status">
              {results.status === "Accepted" ? (
                <h4 className="accepted-status-heading">{results.status}</h4>
              ) : (
                <h4 className="wrong-status-heading">{results.status}</h4>
              )}
            </div>
            <div className="tab-parent">
              <Tabs
                className="tab"
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {problem.test_cases.map((test_case, index) => {
                  console.log("caseid", index);
                  let caseId = `Case ${index + 1}`;
                  return (
                    <Tab key={index} label={caseId} {...a11yProps(index)} />
                  );
                })}
              </Tabs>
              {problem.test_cases.map((test_case, index) => {
                return (
                  <TabPanel
                    key={index}
                    className="tab-item"
                    value={value}
                    index={index}
                  >
                    <h5>Input</h5>
                    <div className="test-case-box"> {mapInput(test_case)}</div>
                    <br />
                    <h5>Output</h5>
                    <div className="test-case-box">
                      <h5>{JSON.stringify(results.results[index].output)}</h5>
                    </div>
                    <br />
                    <h5>Expected</h5>
                    <div className="test-case-box">
                      <h5>{JSON.stringify(test_case.output)}</h5>
                    </div>
                  </TabPanel>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="result-status">
              {results.status === "Accepted" ? (
                <h4 className="accepted-status-heading">{results.status}</h4>
              ) : (
                <h4 className="wrong-status-heading">{results.status}</h4>
              )}
            </div>
            <div className="tab-parent">
              <Tabs
                className="tab"
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {problem.test_cases.map((test_case, index) => {
                  console.log("caseid", index);
                  let caseId = `Case ${index + 1}`;
                  return (
                    <Tab key={index} label={caseId} {...a11yProps(index)} />
                  );
                })}
              </Tabs>
              {problem.test_cases.map((test_case, index) => {
                return (
                  <TabPanel
                    key={index}
                    className="tab-item"
                    value={value}
                    index={index}
                  >
                    <h5>Input</h5>
                    <div className="test-case-box"> {mapInput(test_case)}</div>
                    <br />
                    <h5>Output</h5>
                    <div className="test-case-box">
                      <h5>{JSON.stringify(results.results[index].output)}</h5>
                    </div>
                    <br />
                    <h5>Expected</h5>
                    <div className="test-case-box">
                      <h5>{JSON.stringify(test_case.output)}</h5>
                    </div>
                  </TabPanel>
                );
              })}
            </div>
          </>
        )}
      </StyledEngineProvider>
    </>
  );
};

export default SubmitResult;
