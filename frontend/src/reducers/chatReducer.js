// Başlangıç durumu
const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

// chatReducer fonksiyonu
export function chatReducer(state = initialState, action) {
  switch (action.type) {
    // Tüm konuşmaları alma
    case "GET_CONVERSATIONS_PENDING":
      return { ...state, status: "loading" };

    case "GET_CONVERSATIONS_FULFILLED":
      return { ...state, status: "succeeded", conversations: action.payload };

    case "GET_CONVERSATIONS_REJECTED":
      return { ...state, status: "failed", error: action.payload };

    // Yeni bir konuşma açma
    case "OPEN_CREATE_CONVERSATION_PENDING":
      return { ...state, status: "loading" };

    case "OPEN_CREATE_CONVERSATION_FULFILLED":
      return {
        ...state,
        status: "succeeded",
        activeConversation: action.payload,
        files: [],
      };

    case "OPEN_CREATE_CONVERSATION_REJECTED":
      return { ...state, status: "failed", error: action.payload };

    // Konuşma mesajlarını alma
    case "GET_CONVERSATION_MESSAGES_PENDING":
      return { ...state, status: "loading" };

    case "GET_CONVERSATION_MESSAGES_FULFILLED":
      return { ...state, status: "succeeded", messages: action.payload };

    case "GET_CONVERSATION_MESSAGES_REJECTED":
      return { ...state, status: "failed", error: action.payload };

    // Mesaj gönderme
    case "SEND_MESSAGE_PENDING":
      return { ...state, status: "loading" };

    case "SEND_MESSAGE_FULFILLED":
      const updatedMessages = [...state.messages, action.payload];
      const updatedConversations = state.conversations.map((convo) =>
        convo._id === action.payload.conversation._id
          ? { ...convo, latestMessage: action.payload }
          : convo
      );
      return {
        ...state,
        status: "succeeded",
        messages: updatedMessages,
        conversations: [action.payload.conversation, ...updatedConversations],
        files: [],
      };

    case "SEND_MESSAGE_REJECTED":
      return { ...state, status: "failed", error: action.payload };

    // Aktif konuşmayı ayarlama
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload };

    // Dosya ekleme
    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.payload] };

    // Dosyaları temizleme
    case "CLEAR_FILES":
      return { ...state, files: [] };

    // Dosya silme
    case "REMOVE_FILE":
      return {
        ...state,
        files: state.files.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
