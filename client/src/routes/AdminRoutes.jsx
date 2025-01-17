import React from "react";
import AdminCharts from "../pages/AdminPage/Charts/AdminCharts";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminPage/Dashboard/AdminDashboard";
import AdminAddArticle from "../pages/AdminPage/AddArticle/AdminAddArticle";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAddArticle />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/charts" element={<AdminCharts />} />
      <Route path="/post" element={<AdminAddArticle />} />

    </Routes>
  );
};

export default AdminRoutes;
