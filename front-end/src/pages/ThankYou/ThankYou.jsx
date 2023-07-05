import React from "react";
import "./Thank-you.scss";
import { Link, NavLink } from "react-router-dom";
import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar";
import CommonFooter from "../../components/CommonFooter/Cfooter";


function ThankYou() {
  return (
    <>
      <LandingPageNavbar />
      <div className="thank-you-container">
        <div className="thank-you-main flex">
          <div className="thank-you-content flex">
            <h1>Payment Successful</h1>
            <p>
              Thank you for choosing Leetify. You have been subscribed to
              leetify premium services now.
            </p>
            <Link to="/home">
              <button className="thank-you-content-button">Back Home</button>
            </Link>
          </div>
          <div className="thank-you-image flex">
            <img src="thankyou.png" alt="" width="300" height="400" />
          </div>
        </div>
      </div>
      <CommonFooter />
    </>
  );
}

export default ThankYou;
