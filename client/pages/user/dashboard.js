import React from "react";
import Layout from "./../../components/Layout/index";
import UserRoute from "../../components/routes/UserRoute";
const dashboard = () => {
  return (
    <Layout>
      <UserRoute>
        <h1>Dashboard Page</h1>
      </UserRoute>
    </Layout>
  );
};

export default dashboard;
