import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Route, Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext);
  const history = useHistory();

  if (login) return <Route {...props} />;
  else if (!login) {
    history.push("/");
    return null
  }
  else return null;
};

export default ProtectedRoute;