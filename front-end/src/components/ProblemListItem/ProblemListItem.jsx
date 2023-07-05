import React from "react";
import "./problem-list-item.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProblemListItem({ problem }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("from problemlistitem", problem);
  const handleClick = () => {
    dispatch({ type: "SET_SELECTED_PROBLEM", payload: problem });
    console.log(state);
  };

  return (
    <Link
      to={`/problems/${problem.title}`}
      className="problem-link"
      onClick={handleClick}
    >
      <div className="problem-list-item-container">
        <h3>{problem.title}</h3>
      </div>
    </Link>
  );
}

export default ProblemListItem;
