import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    });
  };

  const setUsernameState = (e) => {
    setUsername(e.target.value);
  };
  const setPasswordState = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={setUsernameState} />
      <input type="text" placeholder="Password" onChange={setPasswordState} />
      <button onClick={login}>LOGIN</button>
    </div>
  );
}
