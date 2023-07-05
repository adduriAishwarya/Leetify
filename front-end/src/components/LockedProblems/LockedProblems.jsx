import React, { useState } from "react";
import  "../ProblemsSolvedByUser/ProblemsSolvedByUser.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import "./LockedProblems.scss"
// Locked Problems are extarcted from the DB and displayed. 
function LockedProblems() {
  const [problems, setProblems] = useState([
    "Problem 1",
    "Problem 2",
    "Problem 3",
    "Problem 4",
  ]);

  return (
    <div className="lockedproblem-container">
      <h2 className="text1">Locked Problems</h2>
      <div className="lockedproblem-list">
        {problems.map((problem, index) => (
          <div key={index} className="lockedproblem">
            <FontAwesomeIcon icon={faLock} size="2xs" style={{"--fa-primary-color": "#ed932c", "--fa-secondary-color": "#edbc07",}}  className="lock-icon" />

            {problem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LockedProblems;
 