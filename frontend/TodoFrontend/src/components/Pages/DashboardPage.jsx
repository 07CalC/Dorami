import React, { useContext } from "react";

import Navigation from "../Navigation";
import DashboardMain from "../DashboardMain";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  

  return (
    <div className="bg-gray-200 flex">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="dashboard w-full p-3">
        <DashboardMain />
      </div>
    </div>
  );
};

export default DashboardPage;
