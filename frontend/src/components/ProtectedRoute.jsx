import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  // IF USER NOT LOGGED IN
  if (!user) {

    return <Navigate to="/login" />;
  }

  // ALLOW ACCESS
  return children;
}

export default ProtectedRoute;