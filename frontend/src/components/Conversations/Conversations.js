import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dateHandler } from "../../utils/date";
import { getConversationId } from "../../utils/chat";

const Conversations = () => {
  const dispatch = useDispatch();
  const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/conversation`; // API endpoint

  // State Yönetimi
  const [status, setStatus] = useState(""); // "loading", "succeeded", "failed"
  const [conversations, setConversations] = useState([]);
  const [activeConversations, setActiveConversations] = useState(null); // Tek bir aktif konuşma
  const [error, setError] = useState("");

  // Redux'dan kullanıcı bilgilerini alıyoruz
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.token; // token'ı kullanıcı bilgisi üzerinden alıyoruz

  // Konuşmaları getiren fonksiyon
  const getConversations = async () => {
    if (!token) return;

    setStatus("loading");
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token ile kimlik doğrulama
        },
      });

      // Redux'a konuşmaları dispatch ediyoruz
      dispatch({ type: "GET_CONVERSATIONS_FULFILLED", payload: data });

      // State'e konuşmaları kaydediyoruz
      setConversations(data);
      console.log(data);
      setStatus("succeeded");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setStatus("failed");
    }
  };

  // Konuşma açma fonksiyonu
  const openConversation = async (values) => {
    if (!token) return;

    setStatus("loading");
    try {
      // API'den konuşmayı alıyoruz
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Yeni bir konuşma açıyoruz (aktif konuşmayı sadece tek bir konuşma yapıyoruz)
      setActiveConversations(data); // Sadece tıklanan konuşmayı aktif yapıyoruz

      // Redux'a aktif konuşmayı dispatch ediyoruz
      dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: data });

      setStatus("succeeded");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setStatus("failed");
    }
  };

  // useEffect ile bileşen yüklendiğinde veya token değiştiğinde konuşmaları alıyoruz
  useEffect(() => {
    if (token) {
      getConversations();
    }
  }, [token]); // token değiştiğinde çalışacak

  // Yükleniyor durumu
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Hata durumu
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <div key={conversation._id}>
              <li
                onClick={() => openConversation()}
                className={`list-none h-[72px] w-full dark:bg-dark_bg_1 bg-slate-500 hover:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px] ${
                  activeConversations?._id === conversation._id
                    ? "bg-blue-500"
                    : ""
                }`}
              >
                <div className="relative w-full flex items-center justify-between py-[10px]">
                  <div className="flex items-center gap-x-3">
                    <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img
                        src={conversation.picture}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full flex flex-col pl-2">
                      <h1 className="font-bold flex items-center gap-x-2">
                        {conversation.username}
                      </h1>
                      <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                        <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                          {conversation.latestMessage?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className="dark:text-dark_text_2">
                      {dateHandler(conversation.latestMessage?.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
              </li>
            </div>
          ))
        ) : (
          <p>No conversations found</p>
        )}
      </ul>
    </div>
  );
};

export default Conversations;
