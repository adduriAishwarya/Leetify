import React, { useState } from "react";
import "./signup.css";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, StyledEngineProvider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Home from "../Home";
import CommonFooter from "../../components/CommonFooter/Cfooter";

const URL = "http://localhost:8000";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    user_status: "USER",
  });
  const [signupSpinner, setSignupSpinner] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    await axios
      .post(`http://localhost:8000/signup`, formData)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          setSignupSpinner(true);
          setTimeout(() => {
            navigate("/signin");
            setSignupSpinner(false);
          }, 3000);
        }
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          setError(true);
          setTimeout(() => {
            navigate("/signin");
            setError(false);
          }, 2000);
        } else {
          console.log("Signup Error", error.message);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInClick = () => {
    const containerRight = document.querySelector(".container-right");
    containerRight.classList.add("slide-in");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="signup-container">
          <div className="container-left">
            <div className="sitebrand1">
              <Link to="/Home" className="sitebrand1">
                <img
                  src="logo-main.png"
                  alt="leetify-logo"
                  width="45"
                  height="45"
                />
                <div className="name1">
                  <span> Leetify</span>
                </div>
              </Link>
            </div>
            <div className="cont">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
            </div>
            <div className="signin-btnclass">
              <Button
                type="submit"
                variant="contained"
                className="signin1-btn1 sheen"
                onClick={handleSignInClick}
              >
                Sign in
              </Button>
            </div>
          </div>
          <div className="container-right">
            <form className="signup-form" onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <TextField
                name="firstname"
                className="firstname"
                label="Firstname"
                variant="outlined"
                type="text"
                required={true}
                onChange={handleChange}
                value={formData.firstname}
              />
              <br />
              <TextField
                name="lastname"
                className="lastname"
                label="Lastname"
                variant="outlined"
                type="text"
                required={true}
                onChange={handleChange}
                value={formData.lastname}
              />
              <br />
              <TextField
                name="email"
                className="email"
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
                className="password"
                label="Password"
                variant="outlined"
                type="password"
                required={true}
                onChange={handleChange}
                value={formData.password}
              />
              <br />

              {signupSpinner ? (
                <div className="signup-success">
                  <CircularProgress className="signup-circular-progress" />
                  <h5>Sign up successful! Redirecting to login page!</h5>
                </div>
              ) : error ? (
                <div className="signup-fail">
                  <CircularProgress className="signup-circular-fail" />
                  <h5>User already exists! Redirecting to login page!</h5>
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className="signup-btn sheen"
                  onClick={handleSignInClick}
                >
                  Sign up
                </Button>
              )}
            </form>
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default Signup;
