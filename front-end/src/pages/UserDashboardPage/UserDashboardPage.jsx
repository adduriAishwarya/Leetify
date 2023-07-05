import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StyledEngineProvider } from "@mui/styled-engine";
import "./user-dashboard-page.scss";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import UserProblemSolvedPie from "../../components/Charts/UserProblemSolvedPie";
import UserDashboardSolvedTable from "../../components/Tables/UserDashboardSolvedTable";

const UserDashboardPage = () => {
  const { userData, problemList } = useSelector((state) => state);

  const [chartProblemSolvedData, setChartProblemSolvedData] = useState([]);
  const [problemSolvedCount, setProblemSolvedCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/group-submission-count/${userData.user._id}`)
      .then((res) => {
        console.log(res.data);
        let data = {
          easy: 0,
          medium: 0,
          hard: 0,
        };
        setProblemSolvedCount(res.data.results.length);
        res.data.results.map((problem) => {
          if (problem) {
            if (problem.difficulty === "Easy") data.easy += 1;
            else if (problem.difficulty === "Medium") data.medium += 1;
            else data.hard += 1;
          }
        });
        let dataobj = [
          { name: "Easy", value: data.easy },
          { name: "Medium", value: data.medium },
          { name: "Hard", value: data.hard },
        ];
        setChartProblemSolvedData(dataobj);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <StyledEngineProvider injectFirst>
        <div className="admin-page-container">
          <div className="admin-page-sidebar">
            <div className="admin-page-btn-container">
              <h4>Dashboard</h4>
            </div>
          </div>
          <div className="admin-page-content">
            <div className="user-dashboard-container">
              <div className="ud-block-1">
                <div className="ud-block-1a">
                  <Avatar alt="user-avatar" className="user-avatar" />
                  <div>
                    <h4>
                      {userData.user.firstname + " " + userData.user.lastname}
                    </h4>
                    <h5>{userData.user.email}</h5>
                  </div>
                </div>
                <div className="ud-block-1b">
                  <UserProblemSolvedPie data={chartProblemSolvedData} />
                  <div className="ud-chart-legend">
                    <h4>{`Solved - ${problemSolvedCount} / ${problemList.length}`}</h4>
                    <div className="ud-chart-label">
                      <div className="ud-cl-easy"></div> <h5>Easy</h5>
                    </div>
                    <div className="ud-chart-label">
                      <div className="ud-cl-medium"></div> <h5>Medium</h5>
                    </div>
                    <div className="ud-chart-label">
                      <div className="ud-cl-hard"></div> <h5>Hard</h5>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="sp-x">Solved Problems</h3>
              <div className="ud-block-2">
                <div className="ud-block-2a"></div>
                <div className="ud-block-2b">
                  <UserDashboardSolvedTable />
                </div>
                <div className="ud-block-2-sp"></div>
              </div>
            </div>
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default UserDashboardPage;
