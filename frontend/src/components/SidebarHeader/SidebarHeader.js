import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChatIcon, DotsIcon, StoryIcon } from "../../svg2";
import Menu from "./Menu/Menu";

const SidebarHeader = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-[50px] flex items-center p16-messanger">
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
              <img
                style={{ width: "30px", height: "30px", background: "black" }}
                src="/icons/community.png"
                alt="Community Icon"
              />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
            <button className={`btn ${showMenu ? "bg-slate-500" : ""}`}>
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {showMenu ? <Menu /> : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
