import React, { useState } from "react";
import "./ProblemsSolvedByUser.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ProblemsSolvedByUser() {
  const [problems, setProblems] = useState([
    "Problem 1",
    "Problem 2",
    "Problem 3",
    "Problem 4",
  ]);

  return (
    <div className="problem-container">
      <h2 className="text1">Solved Problems</h2>
      <div className="problem-list">
        {problems.map((problem, index) => (
          <div key={index} className="problem">
            <FontAwesomeIcon icon={faCheck} style={{color: "#3cddb4", marginRight: "10px"}} />
            {problem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemsSolvedByUser;
