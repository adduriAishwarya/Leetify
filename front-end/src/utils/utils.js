const authenticate = (params) => {
  const userToken = localStorage.getItem("jwtToken");
  if (params === userToken) return true;
  return false;
};

export default authenticate;
