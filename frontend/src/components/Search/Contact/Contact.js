import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Contact({ contact }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.token;

  // State Yönetimi
  const [status, setStatus] = useState(""); // "loading", "succeeded", "failed"
  const [error, setError] = useState("");

  const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/conversation`; // API endpoint

  const openConversation = async (receiver_id) => {
    if (!token) return; // Eğer token yoksa işlem yapma

    setStatus("loading"); // Yükleniyor durumuna geçiyoruz
    try {
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT, // Konuşma açma API endpoint'i
        { receiver_id }, // Alıcı kimliği
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token ile kimlik doğrulama
          },
        }
      );
      dispatch({ type: "OPEN_CREATE_CONVERSATION_FULFILLED", payload: data });

      setStatus("succeeded");
      console.log("Conversation opened: ", data);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setStatus("failed");
    }
  };

  return (
    <li
      onClick={() => openConversation(contact._id)} // Pass the receiver_id here
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/*Container*/}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/*Contact infos*/}
        <div className="flex items-center gap-x-3">
          {/*Conversation user picture*/}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.username}
              className="w-full h-full object-cover "
            />
          </div>
          {/*Conversation name and message*/}
          <div className="w-full flex flex-col">
            {/*Conversation name*/}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.username}
            </h1>
            {/* Conversation status */}
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
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

export default Contact;
