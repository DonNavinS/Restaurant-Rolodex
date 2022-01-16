import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginAction } from "../actions/authActions";
import { idAction } from "../actions/IdAction";
import usernameAction from "../actions/usernameActions";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <div className="flex justify-center mt-4">
          <input
            className="m-2 rounded p-1"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="m-2 rounded p-1"
            type="text"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="m-2 rounded p-1"
            type="text"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            className="m-2 bg-blue-300 rounded hover:bg-blue-500  p-2 transition duration-300 ease-in-out"
            onClick={createNewUser}
          >
            CREATE USER
          </button>
        </div>
      ) : (
        <Redirect to="/total" />
      )}
    </div>
  );
}
