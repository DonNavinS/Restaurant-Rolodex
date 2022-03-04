import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/authActions";
import { usernameAction } from "../actions/usernameActions";
import { idAction } from "../actions/IdAction";
import { Redirect } from "react-router-dom";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";
import { totalDataAction } from "../actions/totalDataAction";
import { triedDataAction } from "../actions/triedDataAction";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state: GlobalState) => state.auth);

  const getTotalData = async (id: Number) => {
    const totalResponse = await apiClient.get(`/total/${id}`);
    dispatch(totalDataAction(totalResponse.data));
    console.log(totalResponse);
  };

  const getTriedData = async (id: Number) => {
    const triedResponse = await apiClient.get(`tried/${id}`);
    dispatch(triedDataAction(triedResponse.data));
  };

  const login = () => {
    apiClient
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data === "Invalid Credentials") {
          alert("Invalid Login Credentials");
        } else {
          const userID = response.data.user.ID;
          dispatch(loginAction());
          dispatch(usernameAction(username));
          dispatch(idAction(userID));
          localStorage.setItem("user_id", userID);
          localStorage.setItem("username", username);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("token", response.data.token);
          getTotalData(userID);
          getTriedData(userID);
        }
      });
  };

  const setUsernameState = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };
  const setPasswordState = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  // const checkForToken = () => {
  //   if (!localStorage.getItem("token ")) {
  //     dispatch(logoutAction());
  //   } else {
  //     dispatch(loginAction());
  //   }
  // };

  // useEffect(() => {
  //   checkForToken();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div className="flex justify-center items-center h-96">
      <section className="border-2 border-black border-opacity-50 rounded-lg shadow-md w-4/12 h-5/6">
        {!loggedInRedux ? (
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-semibold text-4xl">Login</h1>
            <input
              className="m-2 rounded p-1"
              type="text"
              placeholder="Username"
              onChange={setUsernameState}
            />
            <input
              className="m-2 rounded p-1"
              type="text"
              placeholder="Password"
              onChange={setPasswordState}
            />
            <button
              className="m-2 bg-red-300 rounded hover:bg-red-500 hover:text-white  p-2 transition duration-300 ease-in-out"
              onClick={login}
            >
              LOGIN
            </button>
          </div>
        ) : (
          <Redirect to="/home" />
        )}
      </section>
    </div>
  );
}
