import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import ChatActions from "./actions/ChatActions";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";
import { getConversationMessages } from "../../reducers/chatSlice";
import FilesPreview from "./preview/files/FilesPreview";

const ChatContainer = ({ onlineUsers, typing }) => {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((user) => ({ ...user }));
  const token = user?.token;

  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <div>
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            {/*Chat messages*/}
            <ChatMessages typing={typing} />
            {/* Chat Actions */}
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
