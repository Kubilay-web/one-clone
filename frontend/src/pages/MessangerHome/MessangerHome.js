import React, { useEffect } from "react";
import { Sidebar } from "../../components/sidebarchat";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../reducers/chatSlice";
import { ChatContainer, WhatsappHome } from "../../components/Chat";

const MessangerHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const { activeConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default MessangerHome;
