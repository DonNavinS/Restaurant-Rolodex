import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/authActions";
import { usernameAction } from "../actions/usernameActions";
import { idAction } from "../actions/IdAction";
import { Redirect } from "react-router-dom";
import { GlobalState } from "../Type";
import { apiClient, apiClientLogin } from "./ApiClient";
import { totalDataAction } from "../actions/totalDataAction";
import { triedDataAction } from "../actions/triedDataAction";
import { updateToken } from "../actions/tokenAction";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state: GlobalState) => state.auth);

  const getTotalData = async (id: Number, token: string) => {
    const totalResponse = await apiClient.get(`/total/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(totalDataAction(totalResponse.data));
    console.log(totalResponse);
  };

  const getTriedData = async (id: Number, token: string) => {
    const triedResponse = await apiClient.get(`tried/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(triedDataAction(triedResponse.data));
  };

  const login = (e: any) => {
    e.preventDefault();
    apiClientLogin
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data === "Invalid Credentials") {
          alert("Invalid Login Credentials");
        } else {
          dispatch(updateToken(response.data.token));
          const token = response.data.token;
          const userID = response.data.user_id;
          dispatch(loginAction());
          dispatch(usernameAction(username));
          dispatch(idAction(userID));
          localStorage.setItem("user_id", `${userID}`);
          localStorage.setItem("username", username);
          localStorage.setItem("loggedIn", "true");
          getTotalData(userID, token);
          getTriedData(userID, token);
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
  return (
    <div className="logged-out-background fade-in">
      <div
        style={{ background: "rgba(0,0,0,0.6" }}
        className="h-screen w-screen flex-col-reverse flex"
      >
        <form
          onSubmit={login}
          style={{ background: "rgba(211,211,211,0.7)" }}
          className="h-3/4 m-auto border-2 border-black border-opacity-50 rounded-lg shadow-md w-4/12"
        >
          {!loggedInRedux ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 ">
              <h1 className="font-semibold text-4xl text-black">Login</h1>
              <input
                className="m-2 rounded p-1"
                type="text"
                placeholder="Username"
                onChange={setUsernameState}
                required
              />
              <input
                className="m-2 rounded p-1"
                type="text"
                placeholder="Password"
                onChange={setPasswordState}
                required
              />
              <input type="submit" hidden />
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
        </form>
      </div>
    </div>
  );
}
