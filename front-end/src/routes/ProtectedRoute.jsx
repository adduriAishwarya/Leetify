import { Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authenticate from "../utils/utils";

const ProtectedRoute = ({ path, ...props }) => {
  const state = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const isAuthenticated = state ? authenticate(state) : false;

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return <Route path={path} {...props} />;
};

export default ProtectedRoute;
