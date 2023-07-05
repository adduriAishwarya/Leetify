import { StyledEngineProvider } from "@mui/styled-engine-sc";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./admin-page.scss";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import SetProblem from "../../components/SetProblem/SetProblem";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import UpdateProblem from "../../components/UpdateProblem/UpdateProblem";

const AdminPage = () => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showSetProblem, setShowSetProblem] = useState(false);
  const [showUpdateProblem, setShowUpdateProblem] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <AdminNavbar />
      <div className="admin-page-container">
        <div className="admin-page-sidebar">
          <div
            className="admin-page-btn-container"
            onClick={() => {
              setShowDashboard(true);
              setShowSetProblem(false);
              setShowUpdateProblem(false);
            }}
          >
            <h4>Dashboard</h4>
          </div>
          <div
            className="admin-page-btn-container"
            onClick={() => {
              setShowDashboard(false);
              setShowSetProblem(true);
              setShowUpdateProblem(false);
            }}
          >
            <h4>Set Problem</h4>
          </div>
          <div
            className="admin-page-btn-container"
            onClick={() => {
              setShowDashboard(false);
              setShowSetProblem(false);
              setShowUpdateProblem(true);
            }}
          >
            <h4>Update Problem</h4>
          </div>
        </div>
        <div className="admin-page-content">
          {showDashboard ? (
            <AdminDashboard />
          ) : showSetProblem ? (
            <SetProblem />
          ) : showUpdateProblem ? (
            <UpdateProblem />
          ) : (
            ""
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default AdminPage;
