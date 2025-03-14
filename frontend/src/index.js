import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import "./styles/dark.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit'ten configureStore'u içeri aktar
import rootReducer from "./reducers"; // rootReducer'ı içeri aktar

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["chat/addFiles"], // Bu aksiyon için serileştirme kontrolünü devre dışı bırak
        ignoredPaths: ["chat.files"], // Bu yol (chat.files) için serileştirme kontrolünü devre dışı bırak
      },
    }),
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
