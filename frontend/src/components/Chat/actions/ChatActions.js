import React, { useState } from "react";
import EmojiPickerApp from "./EmojiPicker";
import Attachments from "./Attachments";
import { useSelector } from "react-redux";
import Input from "./Input";
import { SendIcon } from "../../../svg-2";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../reducers/chatSlice";
import { ClipLoader } from "react-spinners";

export default function ChatActions() {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

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
    await dispatch(sendMessage(values));
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => SendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp />
          <Attachments />
        </ul>
        <Input message={message} setMessage={setMessage} />
        <button type="submit" className="btn">
          {status === "loading" ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}
