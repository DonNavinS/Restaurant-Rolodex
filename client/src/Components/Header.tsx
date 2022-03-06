import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/authActions";
import { GlobalState } from "../Type";
import { removeUsernameAction } from "../actions/usernameActions";

export default function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const username = useSelector((state: GlobalState) => state.username);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user_id");
    dispatch(logoutAction());
    dispatch(removeUsernameAction());
  };
  return (
    <nav
      style={{ height: "15vh" }}
      className="flex justify-around items-center absolute text-white w-full text-2xl font-semibold"
    >
      <div className="inline-flex gap-x-3 items-center">
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/home"
        >
          HOME
        </Link>
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/total"
        >
          TOTAL
        </Link>
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/tried"
        >
          TRIED
        </Link>
      </div>
      {!loggedIn ? (
        <div className="inline-flex">
          <Redirect to="/login" />
          <Link
            to="/signup"
            className="p-2 bg-transparent hover:text-white rounded transition duration-300 ease-in-out"
          >
            SIGNUP
          </Link>
          <Link
            to="/login"
            className="bg-transparent link-underline:hover link-underline rounded"
          >
            LOGIN
          </Link>
        </div>
      ) : (
        <div className="m-2 inline-flex items-center">
          <p className="p-2">Welcome {username}!</p>
          <button
            className="bg-transparent link-underline:hover link-underline rounded "
            onClick={logout}
          >
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
}
