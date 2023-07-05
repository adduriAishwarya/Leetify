import React from "react";
import "./navbar.scss";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Navigation bar for User, contains, logout function, navigation to premium page, and problems page
function Navbar() {
  const userData = useSelector((state) => state.userData);
  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // logout action is handled and jwt token is deleted.
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("jwtToken");
    navigate("/");
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    navigate("/userDashboard");
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/userprofile");
    setAnchorEl(null);
  };

  return (
    <div className="header-container-div-fix">
      <div className="header-nav header-nav-fix">
        <div className="site-brand">
          <Link to={"/home"}>
            <img
              src="/logo-main.png"
              alt="leetify-logo"
              width="45"
              height="40"
            />
          </Link>
          <Link to={"/home"} className="leetify-text-decor">
            {" "}
            <span className="Leetify-on-navbar ">Leetify</span>
          </Link>
        </div>
        <div className="right-nav right-nav-fix">
          <Link to={`/innerpremiumpage`} className="problem-link">
            <span className="premium">Premium</span>
          </Link>
          <Link to={`/home`} className="problem-link">
            <span className="white-color">Problems</span>
          </Link>

          {/* <a href="#">
            <div>
              <Avatar className="avatar"></Avatar>
            </div>
          </a> */}
          <div>
            <div className="dashboardtn">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {/* Dashboard */}
                <Avatar className="avatar"></Avatar>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
