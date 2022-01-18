import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <div>
      {loggedIn ? (
        <div>
          <div className="flex justify-center text-5xl">
            Recently Updated Restaurants
          </div>
          <div className="flex justify-center text-xl mt-6">
            To view the complete lists of your total and tried restaurants,
            click the links at the top of the page!
          </div>
          <div className="flex justify-center items-center my-8 gap-x-20 text-2xl">
            <div className="flex flex-col justify-center items-center">
              <div>TOTAL</div>
              {totalDataDisplay.map((item) => {
                return <div>name: {item.name}</div>;
              })}
            </div>

            <div className="flex flex-col justify-center items-center">
              <div>TRIED</div>
              {triedDataDisplay.map((item) => {
                return <div>{item.name}</div>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Log in to see restaurants!</div>
      )}
    </div>
  );
}
