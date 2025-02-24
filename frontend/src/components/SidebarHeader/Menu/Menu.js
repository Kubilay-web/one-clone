import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <>
      <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 bg-dark_bg_2 text-dark_text_1 shadow-md w-52">
        <ul>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>New group</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>New community</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Starred messaged</span>
          </li>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
            <span>Settings</span>
          </li>
          <li
            onClick={() => {
              logout();
            }}
            className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          >
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
}
