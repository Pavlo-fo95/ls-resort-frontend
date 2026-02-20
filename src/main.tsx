import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./i18n/i18n";

import { GoogleOAuthProvider } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "").trim();

console.log("GOOGLE_CLIENT_ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);


if (!GOOGLE_CLIENT_ID) {
  // чтобы не ловить "Missing required parameter: client_id"
  console.warn("VITE_GOOGLE_CLIENT_ID is empty. Check .env and restart dev server.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
