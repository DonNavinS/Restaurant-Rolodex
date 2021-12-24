import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../actions/authActions";
import usernameAction from "../actions/usernameActions";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth);

  const login = (req, res) => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data === "Invalid Credentials") {
        alert("Invalid Login Credentials");
      } else {
        dispatch(loginAction());
        dispatch(usernameAction(username));
        console.log(response);
        localStorage.setItem("token ", response.data.token);
      }
    });
  };

  const setUsernameState = (e) => {
    setUsername(e.target.value);
  };
  const setPasswordState = (e) => {
    setPassword(e.target.value);
  };

  const checkForToken = () => {
    if (!localStorage.getItem("token ")) {
      dispatch(logoutAction());
    } else {
      dispatch(loginAction());
    }
  };

  useEffect(() => {
    checkForToken();
  });

  return (
    <div>
      {!loggedInRedux ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={setUsernameState}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={setPasswordState}
          />
          <button onClick={login}>LOGIN</button>
        </div>
      ) : (
        <div>Successful Login !</div>
      )}
    </div>
  );
}
