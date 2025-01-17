import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {
  const loginMessage = useSelector((state) => state.shopping.adminLogin);

  return loginMessage  ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoute;
