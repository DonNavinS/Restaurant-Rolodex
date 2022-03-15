import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StrictMode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-z24w0cwv.us.auth0.com";
const clientID = "fwMcmAGrrsSXWPHmiHoxFe7ENwTWAFPr";
ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain={domain!}
      clientId={clientID!}
      redirectUri={"http://localhost:3000/home"}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById("root")
);
