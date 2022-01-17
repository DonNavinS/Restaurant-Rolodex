import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../actions/authActions";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";

export default function Home() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const checkForToken = () => {
    const token = getToken();
    if (token) {
      dispatch(loginAction());
    } else {
      dispatch(logoutAction());
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);
  return (
    <div>
      {loggedIn ? (
        <div className="flex"></div>
      ) : (
        <div>Log in to see restaurants!</div>
      )}
    </div>
  );
}
