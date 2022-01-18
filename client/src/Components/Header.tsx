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
    <nav className="flex justify-around items-center bg-blue-400 pb-6 w-full py-4 text-2xl">
      <div className="inline-flex items-center">
        <Link
          className="p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out"
          to="/home"
        >
          HOME
        </Link>
        <Link
          className=" p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out "
          to="/total"
        >
          TOTAL
        </Link>
        <Link
          className="p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out"
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
            className="p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out"
          >
            SIGNUP
          </Link>
          <Link
            to="/login"
            className="p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out"
          >
            LOGIN
          </Link>
        </div>
      ) : (
        <div className="m-2 inline-flex items-center">
          <p className="p-2">Welcome {username}!</p>
          <button
            className="p-2 bg-transparent hover:bg-blue-500 rounded transition duration-300 ease-in-out"
            onClick={logout}
          >
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
}
