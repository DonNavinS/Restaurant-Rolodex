import React, { useState } from "react";
import { apiClient } from "./ApiClient";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createNewUser = () => {
    apiClient.post("/signup", {
      username: username,
      password: password,
    });
    window.location.reload();
  };

  const setNewUsername = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };

  const setNewPassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={setNewUsername}
      />
      <input
        type="text"
        placeholder="Enter Password"
        onChange={setNewPassword}
      />
      <button onClick={createNewUser}>CREATE USER</button>
    </div>
  );
}
