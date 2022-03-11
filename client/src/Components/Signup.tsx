import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginAction } from "../actions/authActions";
import { idAction } from "../actions/IdAction";
import { usernameAction } from "../actions/usernameActions";
import { closedEyeIcon, openEyeIcon } from "../icons/icons";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loggedInRedux = useSelector((state: GlobalState) => state.auth);

  const dispatch = useDispatch();

  const createNewUser = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      apiClient
        .post("/signup", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data.insertId);
          dispatch(loginAction());
          dispatch(usernameAction(username));
          dispatch(idAction(response.data.insertId));
        });
    }
  };

  return (
    <div className="logged-out-background fade-in">
      <div
        className="h-screen w-screen flex"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        {!loggedInRedux ? (
          <div
            style={{ background: "rgba(255,255,255,0.5)" }}
            className="border-2 border-black border-opacity-50 rounded-lg h-3/4 w-1/3 m-auto flex flex-col justify-evenly items-center"
          >
            {/* USERNAME INPUT  */}
            <h1 className="font-semibold text-4xl">Signup</h1>
            <div className="flex justify-center gap-x-2">
              <input
                className="rounded p-1"
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <span className="opacity-0">{openEyeIcon}</span>
            </div>
            <div className="flex justify-center gap-x-2">
              {/* PASSWORD INPUT  */}
              <input
                className="rounded p-1"
                type={!showPassword ? "password" : "text"}
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? openEyeIcon : closedEyeIcon}
              </button>
            </div>
            <div className="flex justify-center gap-x-2 ">
              {/* CONFIRM PASSWORD INPUT */}
              <input
                className="rounded p-1"
                type={!showConfirmPassword ? "password" : "text"}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button
                className="text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? openEyeIcon : closedEyeIcon}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="m-2 bg-red-300 rounded hover:bg-red-500 hover:text-white  p-2 transition duration-300 ease-in-out"
                onClick={createNewUser}
              >
                CREATE USER
              </button>
            </div>
          </div>
        ) : (
          <Redirect to="/total" />
        )}
      </div>
    </div>
  );
}
