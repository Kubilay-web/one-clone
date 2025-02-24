import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { dateHandler } from "../../utils/date";

const Conversations = () => {
  const dispatch = useDispatch();
  const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/conversation`; // API endpoint

  // State Yönetimi
  const [status, setStatus] = useState(""); // "loading", "succeeded", "failed"
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");

  // Redux'dan kullanıcı bilgilerini alıyoruz
  const { user } = useSelector((state) => state);
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
      // Hata durumunda hata mesajını state'e kaydediyoruz
      setError(error.response?.data?.message || error.message);
      setStatus("failed");
    }
  };

  // useEffect ile bileşen yüklendiğinde veya token değiştiğinde konuşmaları alıyoruz
  useEffect(() => {
    let isMounted = true; // Bileşen unmounted olup olmadığını kontrol edeceğiz

    if (token) {
      getConversations();
    }

    // Cleanup işlevi
    return () => {
      isMounted = false;
    };
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
              {/* Displaying the participants for the conversation */}

              {/* Displaying the latest message */}
              <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 bg-slate-500 hover:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
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

                {/* {Border} */}

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
