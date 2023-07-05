import React from "react";
import "./problem-space.scss";

const ProblemSpace = ({ selectedProblem }) => {
  return (
    <div className="problem-space-container">
      <h2>{selectedProblem.title}</h2>
      <h4>{selectedProblem.difficulty}</h4>
      <p>{selectedProblem.description}</p>
      <p>
        {selectedProblem.examples.map((example) => {
          return example.example;
        })}
      </p>
    </div>
  );
};

export default ProblemSpace;
