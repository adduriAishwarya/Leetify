import React from "react";
import "./home.scss";
import { Link, NavLink } from "react-router-dom";
import Footer from "./UserHome/Footer";
import CommonFooter from "../components/CommonFooter/Cfooter";
import LandingPageNavbar from "../components/LandingPageNavbar/LandingPageNavbar";
import CustomerReviews from "../components/CustomerReviews/CustomerReviews";

function Home() {
  return (
    <>
      <LandingPageNavbar />

      {/* First Fold*/}

      <div className="first-fold gradient">
        <div className="first-fold-img ">
          <img src="img-bg.png" alt="" width="580" height="600" />
        </div>
        <div className="first-fold-img2">
          <img src="img-frn.png" alt="" width="400" height="400" />
        </div>
        <div className="first-fold-content">
          <h1>A New Way to Learn</h1>
          <br />
          <p>
            Leetify is the best platform to help you enhance your skills, expand{" "}
            <br />
            your knowledge and prepare for technical interviews.
          </p>
          <Link to="/signup">
            <button className="first-fold-content-button">
              Create Account
            </button>
          </Link>
        </div>
      </div>

      {/* USP Section */}
      <div className="usp">
        <div className="usp-content">
          <div className="usp-content-img1">
            <img src="USP.png" alt="" width="67.2" height="64.4" />
          </div>
          <h2 className="usp-heading">Why Choose Us?</h2>
          <p>
            <span>
              Great students deserve the best jobs,
              <br /> Leetify Makes it Happen...
            </span>
          </p>
          <br />
          <div className="usp-flex">
            <div className="usp-box floating">
              <h1>
                Only the
                <br /> highest
                <br /> quality{" "}
              </h1>
              <p>
                Elevate Your Coding Skills
                <br /> to the Next Level with
                <br /> Leetify's Top-Quality,
                <br /> Industry-Standard Platform
              </p>
            </div>
            <div className="usp-box floating-1">
              <h1>
                Easy on the
                <br />
                budget
              </h1>
              <p className="box-p-2">
                Boost Your Coding Skills <br /> with Leetify's Affordable <br />{" "}
                and Effective Online <br /> Platform
              </p>
            </div>
            <div className="usp-box floating-2">
              <h1>Does the job</h1>
              <p className="box-p-3">
                Join the Ranks of Top Tech
                <br /> Talent: 150+ Students Have
                <br /> Secured Jobs in FAANG <br />
                Companies
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Developer Section */}
      <div className="dev">
        <div className="dev-content">
          <div className="dev-content-img1">
            <img src="dev.png" alt="" width="67.2" height="64.4" />
          </div>
          <h2>Developer</h2>
          <p>
            <span>
              We now support popular coding languages. At our core, Leetify is
              about
              <br /> developers. Our powerful development tools such as
              Playground help you test,
              <br /> debug and even write your own code online.
            </span>
          </p>
          <br />
          <img
            src="Developer.png"
            alt=""
            className="dev-content-img2"
            width="947"
            height="403"
          />
        </div>
      </div>
      <CustomerReviews />
      <Footer />

      <CommonFooter />
    </>
  );
}

export default Home;
