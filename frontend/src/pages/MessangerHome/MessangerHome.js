import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";

const MessangerHome = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-[19px] overflow-hidden">
        <div className="container-messanger flex">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MessangerHome;
