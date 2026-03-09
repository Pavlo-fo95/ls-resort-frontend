import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import { CartProvider } from "./context/CartProvider";

import "./styles/index.css";
import "./i18n/i18n";

const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "").trim();

console.log("GOOGLE_CLIENT_ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

if (!GOOGLE_CLIENT_ID) {
  console.warn("VITE_GOOGLE_CLIENT_ID is empty. Check .env and restart dev server.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CartProvider>
        <App />
      </CartProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);