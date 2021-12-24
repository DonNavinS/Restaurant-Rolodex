import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/authActions";

export default function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth);
  const username = useSelector((state) => state.username);
  const logout = () => {
    localStorage.removeItem("token ");
    window.location.reload();
    dispatch(logoutAction());
  };
  return (
    <nav>
      <ul>
        <li>
          <div className="nav-left">
            <Link className="link" to="/total">
              TOTAL
            </Link>
            <Link className="link" to="/tried">
              TRIED
            </Link>
            <Link className="link" to="/home">
              HOME
            </Link>
          </div>
          {!loggedIn ? (
            <div className="nav-right">
              <Link className="link" to="/signup">
                SIGNUP
              </Link>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </div>
          ) : (
            <div className="nav-right">
              <p className="nav-right">welcome {username}</p>
              <button onClick={logout}>LOGOUT</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
