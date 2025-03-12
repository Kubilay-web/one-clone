import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../../reducers/chatSlice";
import Message from "./Message";

export default function ChatMessages() {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  console.log("user", user);
  const { messages, activeConversation } = useSelector((state) => state.chat); // Redux'tan messages ve activeConversation'ı alıyoruz
  const token = user?.token;

  const values = {
    token,
    convo_id: activeConversation?._id, // aktif sohbetin ID'si
  };

  console.log("messages", messages);

  // activeConversation değiştiğinde mesajları yeniden çek
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
    // activeConversation değiştiğinde tekrar veri çekecek
  }, [activeConversation, dispatch]);

  console.log("activeConversation", activeConversation);

  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Eğer messages varsa, her mesaj için Message bileşenini render et */}
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <Message
              message={message}
              key={message._id}
              me={user.id === message.sender._id}
            />
          ))
        ) : (
          <p>No messages available</p> // Eğer mesaj yoksa, bu mesajı göster
        )}
      </div>
    </div>
  );
}
