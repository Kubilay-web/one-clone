import React from "react";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import ChatActions from "./actions/ChatActions";

const ChatContainer = () => {
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <div>
        <ChatHeader />
        <ChatMessages />
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
