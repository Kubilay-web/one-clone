import React from "react";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg-2";
import { capitalize } from "../../../utils/string";

export default function ChatHeader() {
  const { activeConversation } = useSelector((state) => state.chat);

  console.log(activeConversation);

  const { username, picture } = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn !min-w-[40px] !max-[40px]">
            <img
              src={picture}
              alt={`${username} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex-chat flex-col">
            <h1 className="dark:text-white text-md font-bold">{username}</h1>
            <span className="text-xs dark:text-dark_svg_2">Online</span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
