import React from "react";
import "./landingpagenavbar.scss";
import { Link, NavLink } from "react-router-dom";
// Navigation bar for main landing oage
function LandingPageNavbar() {
  return (
    <div>
      <section className="header-section">
        <div className="header-nav">
          <div className="site-brand ">
            <a href="/Home">
              <img
                src="logo-main.png"
                alt="leetify-logo"
                width="45"
                height="45"
              />
            </a>
            <div>
              <a href="/Home" className="brand-name">
                <span> Leetify</span>
              </a>
            </div>
          </div>
          <div className="right-nav">
            <nav>
              <a href="/PremiumPage">
                <span className="premium">Premium</span>
              </a>
              <a href="/signin">
                <span>Sign in</span>
              </a>
              <NavLink to="/signup">
                <span>Sign up</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPageNavbar;
