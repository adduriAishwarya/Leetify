import React from "react";
import "./Cancel-Transaction.scss";
import { Link, NavLink } from "react-router-dom";
import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import CommonFooter from "../../components/CommonFooter/Cfooter";

function CancelTransaction() {
  return (
    <>
      <LandingPageNavbar />
      <div className="cancel-container">
        <div className="cancel-main flex">
          <div className="cancel-content flex">
            <h1>You're almost there!</h1>
            <p>
              Sorry, we had an issue confirming your payment. Please try again.
            </p>
            <Link to="/innerpremiumpage">
              <button className="cancel-content-button">Go Back</button>
            </Link>
          </div>
          <div className="cancel-image flex">
            <img src="sorry.png" alt="" width="300" height="400" />
          </div>
        </div>
      </div>
      <CommonFooter />
    </>
  );
}

export default CancelTransaction;
