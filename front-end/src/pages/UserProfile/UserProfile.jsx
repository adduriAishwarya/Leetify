import React from "react";
import "./User-Profile.scss";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CommonFooter from "../../components/CommonFooter/Cfooter";
import PremiumContent from "../../components/PremiumContent/PremiumContent";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import UserDetails from "../../components/UserDetails/UserDetails";

function UserProfile() {
  return (
    <>
      <Navbar />
      <UserDetails />
      <CommonFooter />
    </>
  );
}

export default UserProfile;
