import React, { useState } from "react";
import "./signin.css";
import axios from "axios";
import { Button, StyledEngineProvider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Signin = () => {
  const appState = useSelector((state) => state);
// Get the dispatch function from the Redux store
  const dispatch = useDispatch();
// Get the navigate function from the react-router-dom library
  const navigate = useNavigate();
// Create a state object for the form data and set initial values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
// Handle changes to form input values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 // Make a POST request to the server with the form data
    axios
      .post("http://localhost:8000/signin", formData)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "SIGNIN_SUCCESS",
          payload: response.data,
        });
// Save the JWT token in local storage
        localStorage.setItem("jwtToken", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
// Handle click on the "Sign up" button
  const handleSignUpClick = () => {
    const containerRight = document.querySelector(".right-container");
    if (containerRight) {
      containerRight.classList.add("slide-in");
      setTimeout(() => {
        navigate("/signup");
      }, 1000);
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="signin-container">
          <div className="left-container">
            <div className="sitebrand2">
              <Link to="/Home" className="sitebrand2">
                <img
                  src="logo-main.png"
                  alt="leetify-logo"
                  width="45"
                  height="45"
                />
                <div className="name2">
                  <span> Leetify</span>
                </div>
              </Link>
            </div>
            <div className="cont2">
              <h1>Hello Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
            </div>
            <div className="signup2-btnclass2">
              <Button
                type="submit"
                variant="contained"
                className="signup2-btn2 sheen"
                onClick={handleSignUpClick}
              >
                Sign up
              </Button>
            </div>
          </div>
          <div className="right-container">
            <form className="signin-form" onSubmit={handleSubmit}>
              <h1>Sign in to Leetify!</h1>
              <TextField
                name="email"
                className="email-signin"
                label="Email"
                variant="outlined"
                type="email"
                required={true}
                onChange={handleChange}
                value={formData.email}
              />
              <br />

              <TextField
                name="password"
                className="password-signin"
                label="Password"
                variant="outlined"
                type="password"
                required={true}
                onChange={handleChange}
                value={formData.password}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                className="signin-btn sheen"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default Signin;
