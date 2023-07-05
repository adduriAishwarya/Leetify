import React from "react";
import "./admin-navbar.scss";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="admin-navbar-container">
      <div className="admin-navbar-left">
        <img src="logo-main.png" alt="leetify-logo" width="45" height="45" />
        <a href="/Home" className="brand-name">
          <span>
            {" "}
            <h2>Leetify Admin</h2>
          </span>
        </a>
      </div>
      <div className="admin-navbar-right">
        <Avatar
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AdminNavbar;
