import React from "react";
import { useSelector } from "react-redux";
import { CommunityIcon } from "../../svg2";

const SidebarHeader = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="h-[50px] bg-dark_bg_2 flex items-center p16-messanger">
      <div className="w-full flex items-center justify-between">
        <button className="btn-messanger">
          <img
            className="w-full h-full rounded-full object-cover"
            src={user.picture}
            alt={user.username}
          />
        </button>
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="btn">
              <CommunityIcon />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
