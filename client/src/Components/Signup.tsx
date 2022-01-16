import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginAction } from "../actions/authActions";
import { idAction } from "../actions/IdAction";
import usernameAction from "../actions/usernameActions";
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
    <div>
      {!loggedInRedux ? (
        <div className="flex-col text-center mt-4 ">
          {/* USERNAME INPUT  */}
          <input
            className="m-2 rounded p-2 mr-9"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="flex justify-center">
            {/* PASSWORD INPUT  */}
            <input
              className="m-2 rounded p-2"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? openEyeIcon : closedEyeIcon}
            </button>
          </div>
          <div className="flex justify-center">
            {/* CONFIRM PASSWORD INPUT */}
            <input
              className="m-2 rounded p-2"
              type={!showConfirmPassword ? "password" : "text"}
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? openEyeIcon : closedEyeIcon}
            </button>
          </div>
          <div>
            <button
              className="m-2 bg-blue-300 rounded hover:bg-blue-500  p-2 transition duration-300 ease-in-out"
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
  );
}
