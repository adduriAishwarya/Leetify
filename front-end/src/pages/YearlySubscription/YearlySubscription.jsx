import React from "react";
import "./Subscription.scss";
import { Button, StyledEngineProvider, TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
  // Add more countries here as needed
];

function YearlySubscription() {
  return (
    <div className="subscription-container">
      <div className="left3-container3">
        <div className="backarrow">
          <Link to="/canceltransaction" className="backarrow">
            <img
              src="backarrow.png"
              alt="leetify-logo"
              width="30"
              height="30"
            />
          </Link>
        </div>
        <div className="storeicon">
          <img src="storeicon.png" alt="leetify-logo" width="30" height="30" />
        </div>
        <div className="cont3">
          <div className="parag1">
            <p>Subscribe to Leetify Premium Yearly Subscription</p>
            <h2>$159.00 </h2>
            <div className="peryear">
              <span>per year</span>
            </div>
          </div>
          <div className="parag2">
            <p>
              Our most popular plan previously sold for $299 and is now
              only$13.25/month.This plan saves you over 60% in comparison to the
              monthly plan.
            </p>
          </div>
        </div>
        <div className="leetifylogo3">
          <img
            src="prem-logo.svg"
            alt="leetify-logo"
            width="220"
            height="220"
          />
        </div>
      </div>
      <div className="right3-container3">
        <form className="subscription-form">
          <h4>Pay with card</h4>
          <div className="cardnum">
            <TextField
              name="cardNumber"
              className="card-number"
              label="Card Number"
              variant="outlined"
              type="text"
              required={true}
            />
          </div>
          <div className="expdate">
            <TextField
              name="expiryDate"
              className="expiry-date"
              label="Expiry Date (MM/YY)"
              variant="outlined"
              type="text"
              required={true}
            />
          </div>
          <div className="cvvdiv">
            <TextField
              name="cvv"
              className="cvv"
              label="CVV"
              variant="outlined"
              type="text"
              required={true}
            />
          </div>
          <div className="cardname">
            <TextField
              name="cardholderName"
              className="cardholdername"
              label="Name on card"
              variant="outlined"
              type="text"
              required={true}
            />
          </div>
          <div className="countrydiv">
            <Select
              name="country"
              className="country-select"
              label="Country or Region"
              variant="outlined"
              required={true}
            >
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="zipdiv">
            <TextField
              name="zip"
              className="zip"
              label="ZIP"
              variant="outlined"
              type="number"
              required={true}
            />
          </div>
          <br />
          <Link to={"/thankyou"}>
            <button className="subbtn" onClick={() => alert("Payment processed successfully!")}>Pay</button>
          </Link>
        </form>
        <div className="terms">
          <p>
            By confirming your subscription, you allow Leetify to charge your
            card for this pavment and future payments in accordance with our
            terms. You can alwavs cancel your subscription.
          </p>
        </div>
      </div>
    </div>
  );
}

export default YearlySubscription;
