import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import ProblemListing from "../../components/ProblemListing/ProblemListing";
import axios from "axios";
import Footer from "./Footer";
import UserDetails from "../../components/UserDetails/UserDetails";
import ProblemsSolvedByUser from "../../components/ProblemsSolvedByUser/ProblemsSolvedByUser";
import AdminPage from "../AdminPage/AdminPage";
import Submission from "../../components/Submission/Submission";
import LockedProblems from "../../components/LockedProblems/LockedProblems";
import AllUsers from "../../components/AllUsers/AllUsers";
import CommonFooter from "../../components/CommonFooter/Cfooter";

function UserHome() {
  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/problems")
      .then((res) => {
        console.log(...res.data.problemList);
        dispatch({ type: "SET_PROBLEM_LIST", payload: res.data.problemList });
        dispatch({ type: "RESET_SUBMISSION_STATUS" });
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(state);

  return (
    <>
      {state.userData.user.user_status === "ADMIN" ? (
        <AdminPage />
      ) : (
        <>
          <Navbar />
          <ProblemListing />
          <CommonFooter />
          {/* <UserDetails /> */}
          {/* <AllUsers/> */}
          {/* <ProblemsSolvedByUser/> */}
          {/* <Submission/> */}
          {/* <LockedProblems/> */}
        </>
      )}
    </>
  );
}

export default UserHome;
