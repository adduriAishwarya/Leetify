import React, { useState } from "react";
import "./UserDetails.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

// Userdetails are extracted from the DB and displayed as default values and can be updated.
function UserDetails() {
  const userData = useSelector((state) => state.userData);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(state)
  // console.log("lastname: " + userData.user.lastname);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const navigate = useNavigate();

  const handleSave = () => {
    setIsEditing(false);
    console.log(firstName, lastName, email, password);
    const data = {
      _id: userData.user._id,
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };
    axios
      .put(`http://localhost:8000/users/${userData.user._id}`, data)
      .then((res) => {
        console.log(res.data);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
    window.alert("Profile updated successfully!");
  };

  return (
    <div>
      <div className="edituser-container">
        <div className="edit-firstfold edit-user-flex ">
          <h1 className="heading-size edit-user-flex  white-color center-text content-decoration">
            Welcome
          </h1>
          <p className="edit-user-flex  white-color center-text content-decoration">
            Manage your info, privacy, and security to make Leetify work better
            for you.
          </p>
          {/**
          <img src="myprofile.png" alt="" width="120" height="120" />
           */}
        </div>
        {/**
          <img
            src="user1.png"
            alt=""
            width="120"
            height="120"
            className="user-img-align"
          />*/}
        <div className="userdetails-form-heading">
          <h1>Edit Profile</h1>
          <p>Use the form below to edit your personal info</p>
        </div>
        <div className="User-details-box">
          <div className="text-textbox-pos">
            <div className="form-row ">
              <label htmlFor="firstname" className="">
                First Name
              </label>
              <div>
                <TextField
                  id="firstname"
                  size="small"
                  onChange={handleFirstNameChange}
                  placeholder={userData.user.firstname}
                  className="text-box-pospos"
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="lastname">Last Name</label>
              <div>
                <TextField
                  id="lastname"
                  size="small"
                  onChange={handleLastNameChange}
                  placeholder={userData.user.lastname}
                  className="text-box-pospos"
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div>
                <TextField
                  type="email"
                  id="email"
                  size="small"
                  onChange={handleEmailChange}
                  placeholder={userData.user.email}
                  className="text-box-pospos"
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div>
                <TextField
                  type="password"
                  id="password"
                  size="small"
                  onChange={handlePasswordChange}
                  placeholder="******"
                  className="text-box-pospos"
                />
              </div>
            </div>

            <Button
              className="save-profile-btn"
              variant="contained"
              onClick={handleSave}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
