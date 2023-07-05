import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./submission.scss";

import { Pagination } from "@mui/material";

const Submission = () => {
  const state = useSelector((state) => state);

  const PAGE_SIZE = 5;
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [itr, setItr] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/solutions/${state.userData.user._id}/${state.selectedProblem._id}`
      )
      .then((res) => {
        console.log(res.data);
        setSubmissions(res.data.submissions.reverse());
        setSubmissionCount(res.data.submissions.length);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  const showSubmissionCodePanel = (event) => {
    console.log(event.target);
    console.log(event.target.id);
    const submission = submissions.find(
      (submission) => submission._id === event.target.id
    );
    dispatch({ type: "SHOW_SUBMISSION_CODE_PANEL", payload: submission });
  };

  const renderData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const currentData = submissions.slice(start, end);

    return currentData.map((submission, index) => {
      return (
        <div
          key={submission._id}
          className="submission-item-container"
          onClick={showSubmissionCodePanel}
          id={submission._id}
        >
          <div className="submission-item-left" id={submission._id}>
            {submission.status === "Accepted" ? (
              <h4 style={{ color: "#0fc70f" }} id={submission._id}>
                Accepted
              </h4>
            ) : (
              <h4 style={{ color: "#f50707" }} id={submission._id}>
                Wrong Answer
              </h4>
            )}
            <h5 id={submission._id}>{`Time: ${new Date(
              submission.created_at
            ).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
              timeZoneName: "short",
            })}`}</h5>
          </div>
          <div className="submission-item-right" id={submission._id}>
            {submission.language === "JavaScript" ? (
              <img src="/js_logo.png" alt="" id={submission._id} />
            ) : (
              submission.language
            )}
          </div>
        </div>
      );
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(submissions.length / PAGE_SIZE); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="page">
        <Pagination
          count={pageNumbers.length}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </div>
    );
  };

  return (
    <div>
      {/* {submissions
        ? submissions.reverse().map((submission, index) => {
            return <h5>{`Submission ${submissions.length - index}`}</h5>;
          })
        : ""} */}

      {renderData()}

      {renderPageNumbers()}
    </div>
  );
};

export default Submission;
