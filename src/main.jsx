import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AuthLoader from "./components/AuthLoader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthLoader />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
