import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-z24w0cwv.us.auth0.com";
const clientId = "iMJ9jDfAv0m5iZZ7v1DLrefNxaC0yXM3";
ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={"http://localhost:3000/home"}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
