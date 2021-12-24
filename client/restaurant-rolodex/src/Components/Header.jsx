import React from "react";
import { Link } from "react-router-dom";
import { store } from "../store";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("token ");
    window.location.reload();
    store.dispatch({ type: "LOGGED_OUT" });
  };
  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/total">
            TOTAL
          </Link>
          <Link className="link" to="/tried">
            TRIED
          </Link>
          <Link className="link" to="/home">
            HOME
          </Link>
          <Link className="link" to="/signup">
            SIGNUP
          </Link>
          <Link className="link" to="/login">
            LOGIN
          </Link>
          <button onClick={logout}>LOGOUT</button>
        </li>
      </ul>
    </nav>
  );
}
