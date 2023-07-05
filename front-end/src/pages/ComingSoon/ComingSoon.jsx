import React from "react";
import { Link } from "react-router-dom";
import './ComingSoon.scss'

function ComingSoon(){
    return (
      <div className="comingsoon-container">
        <div className="greatthings">
          <h1>Great things coming soon.</h1>
          <h2>In the meantime, explore our current problems.</h2>
          <div className="explrbtndiv">
            <Link to={"/home"}>
              <button className="explrbtn">Explore Problems</button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default ComingSoon;