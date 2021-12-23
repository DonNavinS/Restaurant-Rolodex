import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [token, setToken] = useState("");

  const login = (req, res) => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data === "Invalid Credentials") {
        alert("Invalid Login Credentials");
      } else {
        console.log(response);
        localStorage.setItem("token ", response.data.token);
        setLoggedIn(true);
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
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);

  return (
    <div>
      {!loggedIn ? (
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
