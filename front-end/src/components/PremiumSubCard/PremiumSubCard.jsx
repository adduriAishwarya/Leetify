import React from "react";
import "./Premium-Sub-Card.scss";

function PremiumSubCard() {
  return (
    <>
      <div className="subscription-card">
        <div className="main-month">
          <div className="main-month-content">
            <div className="flex items-end gap-3">
              <div className="text-2xl font-medium text-label-1">Monthly</div>
              <div className="mb-[1px] text-base text-label-2">billed monthly</div>
            </div>
            <div className="text-md text-label-3">
              <span className="font-semibold text-label-2">
                Down from $39/month.
              </span>
              <br />
              <p>
                {" "}
                Our monthly plan grants access to{" "}
                <span className="font-semibold text-label-2">
                  all premium features
                </span>
                , the best plan for short-term subscribers.
              </p>
            </div>
            <div className="flex gap-2 py-4">
              <div className="flex gap-2">
                <div className="text-4xl font-semibold text-label-1">$35</div>
                <div className="mb-0.5 text-base text-label-2 txt-mo">/mo</div>
              </div>
            </div>
            <button
  className="rounded items-center btn flex w-full justify-center bg-black py-2 px-4 text-base font-medium text-white"
  onClick={() => alert("Please create an account or sign in to subscribe to our Monthly Plan!")}
>
  Subscribe
</button>
          </div>
        </div>
        <div className="main-yearly">
          <div className="main-yearly-content">
            <div className="flex items-end gap-3">
              <div className="text-2xl font-medium text-label-1">Yearly</div>
              <div className="mb-[1px] flex text-base text-label-2  pos-bill">
                billed yearly
                <span className="flex">
                  (<span className="">$159</span>)
                </span>
                <div className=" rounded px-3 py-1 text-md font-medium text-label-1 bg-pop">
                  🎉 Most popular
                </div>
              </div>
            </div>
            <div className="text-md text-label-3 desc-yr">
              Our{" "}
              <span className="font-semibold text-label-2">most popular</span>{" "}
              plan previously sold for $299 and is now only
              <br />{" "}
              <span className="font-semibold text-label-2">$13.25/month</span>
              .<br />
              This plan{" "}
              <span className="font-semibold text-label-2">
                saves you over 60%
              </span>{" "}
              in comparison to the monthly plan.
            </div>
            <div className="price-yr">
              <div className="flex gap-2 py-4">
                <div className="flex gap-2">
                  <div className="text-4xl font-semibold text-label-1">$13.25</div>
                  <div className="mb-0.5 text-base text-label-2 txt-mo">/mo</div>
                </div>
              </div>
              <button
                className="yr-sub-btn rounded items-center btn flex w-full justify-center bg-black py-2 px-4 
                text-base font-medium text-white"
                onClick={() => alert("Please create an account or sign in to subscribe to our Yearly Plan!")}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default PremiumSubCard;