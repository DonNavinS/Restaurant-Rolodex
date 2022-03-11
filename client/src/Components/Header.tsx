import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/authActions";
import { GlobalState, Props } from "../Type";
import { removeUsernameAction } from "../actions/usernameActions";

const Header: React.FC<Props> = ({ setHeaderBG, headerBG }) => {
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
      style={{ height: "10%" }}
      className={`z-20 flex justify-around items-center fixed ${headerBG!}  text-white w-full text-2xl font-semibold`}
    >
      <div className="inline-flex gap-x-3 items-center">
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/home"
          onClick={() => setHeaderBG!("")}
        >
          HOME
        </Link>
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/total"
          onClick={() => setHeaderBG!("bg-blue-300")}
        >
          TOTAL
        </Link>
        <Link
          className="bg-transparent link-underline:hover link-underline rounded"
          to="/tried"
          onClick={() => setHeaderBG!("bg-blue-300")}
        >
          TRIED
        </Link>
      </div>
      {!loggedIn ? (
        <div className="inline-flex items-center gap-6">
          <Redirect to="/login" />
          <Link
            to="/signup"
            className="bg-transparent link-underline:hover link-underline rounded "
            onClick={() => setHeaderBG!("")}
          >
            SIGNUP
          </Link>
          <Link
            to="/login"
            className="bg-transparent link-underline:hover link-underline rounded"
            onClick={() => setHeaderBG!("")}
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
};

export default Header;
