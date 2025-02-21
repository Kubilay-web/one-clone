import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";

const MessangerHome = () => {
  return (
    <div>
      <div className="min-h-screen bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
        <div className="container-messanger w-full flex">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MessangerHome;
