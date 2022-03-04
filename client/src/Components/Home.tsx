import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction, logoutAction } from "../actions/authActions";
import { totalDataAction } from "../actions/totalDataAction";
import { triedDataAction } from "../actions/triedDataAction";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";

export default function Home() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const totalData = useSelector((state: GlobalState) => state.totalData);
  const triedData = useSelector((state: GlobalState) => state.triedData);

  const triedDataDisplay = triedData.slice(-5).reverse();
  const totalDataDisplay = totalData.slice(-5).reverse();

  // const getToken = () => {
  //   return localStorage.getItem("token");
  // };
  // const checkForToken = () => {
  //   const token = getToken();
  //   console.log(token);

  //   if (token) {
  //     dispatch(loginAction());
  //   } else {
  //     dispatch(logoutAction());
  //   }
  // };

  const retrieveData = () => {
    if (loggedIn && totalData.length === 0 && triedData.length === 0) {
      apiClient.get(`/total/${user_id}`).then((response) => {
        dispatch(totalDataAction(response.data));
      });
      apiClient.get(`/tried/${user_id}`).then((response) => {
        dispatch(triedDataAction(response.data));
      });
    }
  };

  useEffect(() => retrieveData(), []);
  return (
    <div className="background">
      <div className="mx-auto bg-opacity-50">
        {loggedIn ? (
          <div
            style={{ height: "85vh", background: "rgba(0,0,0,0.6)" }}
            className="flex flex-col justify-evenly items-center text-white"
          >
            <h1 className="text-center text-5xl font-semibold ">
              Recently Updated Restaurants
            </h1>
            <h3 className="text-center text-xl" style={{ width: "60vw" }}>
              To view the complete lists of your total and tried restaurants,
              and to add, update, or delete restaurants, click the links at the
              top of the page!
            </h3>
            <div className="flex justify-center gap-x-20">
              <div className="flex flex-col items-center">
                <Link
                  to="/total"
                  className="font-semibold text-3xl link-underline:hover link-underline"
                >
                  TOTAL
                </Link>
                <div className="flex flex-col items-center text-2xl">
                  {totalDataDisplay.map((item) => {
                    return <div>Name: {item.name}</div>;
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Link
                  to="/tried"
                  className="font-semibold text-3xl link-underline:hover link-underline"
                >
                  TRIED
                </Link>
                <div className="text-2xl">
                  {triedDataDisplay.map((item) => {
                    return <div>Name: {item.name}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-4xl font-semibold items-center translate-y-32">
            <Link to="/login" className="pr-2 font-semibold hover:underline">
              Login
            </Link>
            to see your restaurants!
          </div>
        )}
      </div>
    </div>
  );
}
