import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/authActions";
import { GlobalState } from "../Type";

export default function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const username = useSelector((state: GlobalState) => state.username);
  const logout = () => {
    localStorage.removeItem("token ");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    dispatch(logoutAction());
  };
  return (
    <nav className="flex justify-around bg-blue-400">
      <div className="my-4">
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
        <div className="flex">
          <Redirect to="/login" />
          <Link className="p-2" to="/signup">
            SIGNUP
          </Link>
          <Link className="p-2" to="/login">
            LOGIN
          </Link>
        </div>
      ) : (
        <div className="m-2 inline-flex">
          <p className="p-2">welcome {username}</p>
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