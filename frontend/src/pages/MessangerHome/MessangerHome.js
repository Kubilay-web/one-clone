import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebarchat";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../../reducers/chatSlice";
import { ChatContainer, WhatsappHome } from "../../components/Chat";
import SocketContext from "../../context/SocketContext";

function MessangerHome({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  //join user

  useEffect(() => {
    socket.emit("join", user.id);

    //getOnlineUsers

    socket.on("get-online-users", (users) => {
      console.log("online users", users);
      setOnlineUsers(users);
    });
  }, [user]);

  console.log(socket);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [user, dispatch]);

  //listening to receive messages

  useEffect(() => {
    //listening receeive message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });

    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {activeConversation._id ? (
          <ChatContainer onlineUsers={onlineUsers} typing={typing} />
        ) : (
          <WhatsappHome />
        )}
      </div>
    </div>
  );
}

const MessangerHomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <MessangerHome {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default MessangerHomeWithSocket;
