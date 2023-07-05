import React from "react";
import "./Inner-Premium-Page.scss";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CommonFooter from "../../components/CommonFooter/Cfooter";
import PremiumContent from "../../components/PremiumContent/PremiumContent";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import InnerPremiumSubCard from "../../components/InnerPremiumSubCard/InnerPremiumSubCard";

function InnerPremiumPage() {
  return (
    <>
      <Navbar />
      <PremiumContent />
      <InnerPremiumSubCard />
      <CustomerReviews />
      <CommonFooter />
    </>
  );
}

export default InnerPremiumPage;
