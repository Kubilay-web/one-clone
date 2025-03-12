import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./userReducer";
import chatReducer from "./chatSlice";

const rootReducer = combineReducers({
  user: userReducer,
  darkTheme: themeReducer,
  chat: chatReducer,
});

export default rootReducer;
