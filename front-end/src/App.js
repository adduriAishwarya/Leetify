import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

import axios from "axios";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import UserHome from "./pages/UserHome/UserHome";
import { useSelector } from "react-redux";
import authenticate from "./utils/utils";
import ProblemPage from "./pages/ProblemPage/ProblemPage";
import Premium from "./pages/PremiumPage/PremiumPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import InnerPremiumPage from "./pages/InnerPremiumPage/InnerPremiumPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import MonthlySubscription from "./pages/MonthlySubscription/MonthlySubscription";
import YearlySubscription from "./pages/YearlySubscription/YearlySubscription";
import ThankYou from "./pages/ThankYou/ThankYou";
import CancelTransaction from "./pages/CancelTransaction/CancelTransaction";
import UserDashboardPage from "./pages/UserDashboardPage/UserDashboardPage";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

function App() {
  const state = useSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/premiumpage" element={<Premium />} />

        <Route
          path="/home"
          element={<ProtectedRoute element={<UserHome />} />}
        />

        <Route
          path="/userprofile"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        <Route
          path="/innerpremiumpage"
          element={<ProtectedRoute element={<InnerPremiumPage />} />}
        />
        <Route
          path="/userDashboard"
          element={<ProtectedRoute element={<UserDashboardPage />} />}
        />
        <Route
          path="/problems/:problemName"
          element={<ProtectedRoute element={<ProblemPage />} />}
        />

        <Route
          path="/monthlysubscription"
          element={<ProtectedRoute element={<MonthlySubscription />} />}
        />

        <Route
          path="/yearlysubscription"
          element={<ProtectedRoute element={<YearlySubscription />} />}
        />

        <Route
          path="/thankyou"
          element={<ProtectedRoute element={<ThankYou />} />}
        />

        <Route
          path="/canceltransaction"
          element={<ProtectedRoute element={<CancelTransaction />} />}
        />

        <Route
          path="/comingsoon"
          element={<ProtectedRoute element={<ComingSoon />} />}
        />
       
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute(props) {
  const state = useSelector((state) => state.userData);

  const isAuthenticated = state ? authenticate(state.token) : false;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.element;
}

export default App;
