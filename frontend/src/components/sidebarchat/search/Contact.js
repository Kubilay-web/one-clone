import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../reducers/chatSlice";
import SocketContext from "../../../context/SocketContext";

function Contact({ contact, setSearchResults, socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const token = user.token;

  const values = {
    receiver_id: contact._id,
    token,
  };

  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
    setSearchResults([]);
  };

  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      <div className="flex items-center gap-x-3 py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full">
            <img
              src={contact.picture}
              alt={contact.username}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.username}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ContactWithContext = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Contact {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default ContactWithContext;
