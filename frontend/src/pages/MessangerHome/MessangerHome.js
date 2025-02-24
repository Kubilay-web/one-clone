import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import WhatsappHome from "../../components/Chat/Welcome/WhatsappHome.js";

const MessangerHome = () => {
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => ({ ...state }));
  const activeConversation = chat.activeConversation;
  return (
    <div>
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div className="container-messanger h-screen flex py-[19px]">
          <Sidebar />
          {activeConversation._id ? "home" : <WhatsappHome />}
        </div>
      </div>
    </div>
  );
};

export default MessangerHome;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import Sidebar from "../../components/Sidebar/Sidebar.js";

// const MessangerHome = () => {
//   const dispatch = useDispatch();
//   const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/conversation`; // API endpoint

//   // State Yönetimi
//   const [status, setStatus] = useState(""); // "loading", "succeeded", "failed"
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState("");

//   // Redux'dan kullanıcı bilgilerini alıyoruz
//   const { user } = useSelector((state) => state);
//   const token = user.token; // token'ı kullanıcı bilgisi üzerinden alıyoruz

//   // Konuşmaları getiren fonksiyon
//   const getConversations = async () => {
//     if (!token) return;

//     setStatus("loading");
//     try {
//       const { data } = await axios.get(CONVERSATION_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${token}`, // JWT token ile kimlik doğrulama
//         },
//       });

//       // Redux'a konuşmaları dispatch ediyoruz
//       dispatch({ type: "GET_CONVERSATIONS_FULFILLED", payload: data });

//       // State'e konuşmaları kaydediyoruz
//       setConversations(data);
//       setStatus("succeeded");
//     } catch (error) {
//       // Hata durumunda hata mesajını state'e kaydediyoruz
//       setError(error.response?.data?.message || error.message);
//       setStatus("failed");
//     }
//   };

//   // useEffect ile bileşen yüklendiğinde veya token değiştiğinde konuşmaları alıyoruz
//   useEffect(() => {
//     let isMounted = true; // Bileşen unmounted olup olmadığını kontrol edeceğiz

//     if (token) {
//       getConversations();
//     }

//     // Cleanup işlevi
//     return () => {
//       isMounted = false;
//     };
//   }, [token]); // token değiştiğinde çalışacak

//   // Yükleniyor durumu
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   // Hata durumu
//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <div className="h-screen flex items-center justify-center overflow-hidden">
//         <div className="container-messanger h-screen flex">
//           <Sidebar />
//           {/* Konuşmaların Listesini Gösterme */}
//           <div className="conversations-list flex flex-col w-full">
//             {conversations.length > 0 ? (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation._id}
//                   className="conversation-item p-4 border-b"
//                 >
//                   {/* Conversation Name (username for non-group, group name for groups) */}
//                   <h2 className="font-bold">
//                     {conversation.username || "Unnamed Conversation"}
//                   </h2>

//                   {/* Displaying the participants for the conversation */}
//                   <p>
//                     Participants:{" "}
//                     {conversation.users
//                       ? conversation.users.map((user, index) => (
//                           <span key={index}>{user.name}</span>
//                         ))
//                       : "No participants"}
//                   </p>

//                   {/* Displaying the latest message */}
//                   <p>
//                     Latest Message:{" "}
//                     {conversation.latestMessage
//                       ? conversation.latestMessage.text || "No latest message"
//                       : "No latest message"}
//                   </p>

//                   {/* Display if it's a group conversation */}
//                   {conversation.isGroup && (
//                     <p className="text-sm text-gray-500">
//                       This is a group chat
//                     </p>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No conversations found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessangerHome;
