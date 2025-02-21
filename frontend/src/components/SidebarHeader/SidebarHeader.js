import React from "react";
import { useSelector } from "react-redux";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[50px] bg-dark_bg_2 flex items-center p16-messanger">
      <div className="w-full flex items-center justify-between">
        <button className="btn">
          <img src={user.picture} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
