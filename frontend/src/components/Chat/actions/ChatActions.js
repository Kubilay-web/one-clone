import React, { useRef, useState } from "react";
import EmojiPickerApp from "./EmojiPicker";
import Attachments from "./attachments/Attachments";
import { useSelector } from "react-redux";
import Input from "./Input";
import { SendIcon } from "../../../svg-2";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../reducers/chatSlice";
import { ClipLoader } from "react-spinners";
import SocketContext from "../../../context/SocketContext";

function ChatActions({ socket }) {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setshowAttachments] = useState(false);

  const textRef = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const { activeConversation, status } = useSelector((state) => state.chat);
  const token = user?.token;

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };

  const SendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => SendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setshowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setshowAttachments}
            setShowPicker={setShowPicker}
          />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithSocket;
