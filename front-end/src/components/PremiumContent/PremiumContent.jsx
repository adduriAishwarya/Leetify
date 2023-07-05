import React from "react";
import "./premiumcontent.scss";
// Leetify subscription selection card
function PremiumContent() {
  return (
    <>
      <section className="prem-first-fold">
        <img src="prem-logo.svg" alt="" />
        <div className="prem-box-2 fade-in">
          <h1>Premium</h1>
        </div>
        <div className="Prem-tag fade-in">
          <p>
            {" "}
            Get started with a Leetify <br /> Subscription that works for you.
          </p>
        </div>
      </section>
      <section>
        <div className="subscription fade-in-2">
          <h2>Monthly and Yearly Pricing Plans</h2>
          <p>
            Our monthly and yearly plans, grants access to{" "}
            <span>
              {" "}
              all premium <br />
              features
            </span>
            , the best plans for all subscribers.
          </p>
        </div>

        {/* subscription section*/}
        
      </section>
    </>
  );
}

export default PremiumContent;