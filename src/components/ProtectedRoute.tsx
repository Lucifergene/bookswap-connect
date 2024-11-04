import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../App";

const ProtectedRoute: React.FC = () => {
  const [user] = useContext(Context);

  if (!user.name) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
