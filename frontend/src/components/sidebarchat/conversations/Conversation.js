import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../reducers/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { dateHandler } from "../../../utils/date";
import SocketContext from "../../../context/SocketContext";

function Conversation({ convo, socket, online, typing }) {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const { activeConversation } = useSelector((state) => state.chat);

  const token = user?.token;
  const values = {
    receiver_id: getConversationId(user, convo.users),
    token,
  };

  // Konuşma açma işlemi
  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
      }`}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            }`}
          >
            <img
              src={getConversationPicture(user, convo.users)}
              alt="picture"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {getConversationName(user, convo.users)}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  {typing === convo._id ? (
                    <p className="text-green-200">Typing...</p>
                  ) : (
                    <p>{convo.latestMessage?.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sağ Kısım - Tarih */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithContext = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Conversation {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default ConversationWithContext;
