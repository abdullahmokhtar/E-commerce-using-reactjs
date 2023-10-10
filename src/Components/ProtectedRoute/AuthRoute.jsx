import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const { userIsLoggedIn } = useContext(AuthContext);
  if (userIsLoggedIn && localStorage.getItem("token")) {
    return <Navigate  to="/home"/>;
  } else {
    return children;
  }
}

export default AuthRoute;
