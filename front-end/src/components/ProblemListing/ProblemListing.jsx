import React, { useEffect, useState } from "react";
import ProblemListItem from "../ProblemListItem/ProblemListItem";
import { useSelector } from "react-redux";
import "./problem-listing.scss";
import { Pagination, Skeleton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";


const PAGE_SIZE = 5;
// Get the list of problems from the DB and display.
function ProblemListing() {
  const [currentPage, setCurrentPage] = useState(1);

  const problems = useSelector((state) => state.problemList);

  const [problemList, setProblemList] = useState([]);
// Use effect to get and filter out the problems based on difficulty level
  useEffect(() => {
    if (problems) {
      setProblemList(
        problems.filter((problem) => problem.difficulty === "Easy")
      );
    }
  }, [problems]);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // render data and display
  const renderData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const currentData = problemList.slice(start, end);

    return currentData.map((problem) => (
      <div key={problem._id}>
        <ProblemListItem problem={problem} />
      </div>
    ));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(problemList.length / PAGE_SIZE); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="page problem-listing-page-bar">
        <Pagination
          count={pageNumbers.length}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </div>
    );
  };
// handle the problem listing and redirect based on difficulty level
  const handleEasy = () => {
    setProblemList(problems.filter((problem) => problem.difficulty === "Easy"));
  };

  const handleMedium = () => {
    setProblemList(
      problems.filter((problem) => problem.difficulty === "Medium")
    );
  };

  const handleHard = () => {
    setProblemList(problems.filter((problem) => problem.difficulty === "Hard"));
  };

  return (
    <div className="problem-listing-container">
      <h1 className="explore-content-h1">Featured</h1>
      <div className="featured-main-div">
        <div className="image-content-div">
          <Link to="/comingsoon">
            <img src="study-plan.png" alt="" className="featured-img-size" />
          </Link>

          <p className="featured-img-description">
            Leetify 75 Study Plan <br /> to Ace Interviews
          </p>
        </div>
        <div className="image-content-div">
          <Link to="/comingsoon">
            <img src="Algorithms.png" alt="" className="featured-img-size" />
          </Link>

          <p className="featured-img-description">
            14 Days Study Plan <br /> to Crack Algo
          </p>
        </div>
        <div className="image-content-div">
          <Link to="/comingsoon">
            <img
              src="data-structures.png"
              alt=""
              className="featured-img-size"
            />
          </Link>

          <p className="featured-img-description">
            2 Weeks Study Plan
            <br /> to Tackle DS
          </p>
        </div>
        <div className="image-content-div">
          <Link to="/comingsoon">
            <img src="sql.png" alt="" className="featured-img-size" />
          </Link>

          <p className="featured-img-description"> SQL Study Plan</p>
        </div>
        <div className="image-content-div">
          <Link to="/comingsoon">
            <img
              src="programing-skill-plan.png"
              alt=""
              className="featured-img-size"
            />
          </Link>

          <p className="featured-img-description">Ultimate DP Study Plan</p>
        </div>
      </div>
      <h1 className="explore-content-h1">Explore Problems</h1>
      <p className="explore-content">
        Discover a structured approach to programming advancement with Leetify's
        well-arranged difficulty-level problems, <br /> designed to optimize
        your progress towards the next level in your programming career.{" "}
      </p>
      <div className="problem-cat-container ">
        <div className="problem-cat easy sheen" onClick={handleEasy}>
          <h3>Easy</h3>
        </div>
        <div className="problem-cat medium sheen" onClick={handleMedium}>
          <h3>Medium</h3>
        </div>
        <div className="problem-cat hard sheen" onClick={handleHard}>
          <h3>Hard</h3>
        </div>
      </div>

      <div className="problem-listing-space">
        {problemList ? (
          renderData()
        ) : (
          <Skeleton animation="wave" height={20} width="40%" />
        )}
      </div>
      <div>{renderPageNumbers()}</div>
    </div>
  );
}

export default ProblemListing;
