import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeTriedDataAction,
  triedDataAction,
  updateTriedDescription,
  updateTriedName,
} from "../actions/triedDataAction";
import { pencilIcon } from "../icons/icons";
import { GlobalState, TriedRestaurant } from "../Type";
import AddAction from "./AddAction";
import { apiClient } from "./ApiClient";

export default function TriedV1() {
  const dispatch = useDispatch();

  const triedData = useSelector((state: GlobalState) => state.triedData);
  const username = useSelector((state: GlobalState) => state.username);
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const loggedIn = useSelector((state: GlobalState) => state.auth);

  const getData = async () => {
    if (user_id !== null) {
      const response = await apiClient.get(`/tried/${user_id}`);
      if (triedData.length === 0) {
        dispatch(triedDataAction(response.data));
      }
    }
  };

  const removeItem = async (item: TriedRestaurant) => {
    const response = await apiClient.delete(`/tried/remove/${item.idtried}`);
    const id = parseInt(response.data.idtried);
    dispatch(removeTriedDataAction(id));
  };

  const toggleNameUpdate = (item: TriedRestaurant) => {
    let updatedName = prompt("Enter new Restaurant Name");
    if (updatedName === null) {
      alert("No changes made");
    } else {
      apiClient.put(`/tried/update/name/${item.idtried}`, {
        newName: updatedName,
      });
      dispatch(updateTriedName(item.idtried, updatedName));
    }
  };

  const toggleDescUpdate = (item: TriedRestaurant) => {
    let updatedDesc = prompt("Enter new Description");
    if (!updatedDesc) {
      alert("No changes made");
    } else {
      apiClient.put(`/tried/update/description/${item.idtried}`, {
        newDesc: updatedDesc,
      });
      dispatch(updateTriedDescription(item.idtried, updatedDesc));
    }
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [username]);

  return (
    <div className="font-medium">
      {loggedIn && <AddAction table={"tried"} />}
      {loggedIn && triedData ? (
        triedData.map((item, index) => {
          return (
            <div
              className="grid grid-cols-12 items-center rounded mx-4 p-1 hover:bg-blue-500 hover:bg-opacity-80 transition duration-200"
              key={index}
            >
              <div className="flex items-center col-start-2 h-fit">
                <span className="p-2">{item.name}</span>
                <button
                  className="opacity-20 hover:opacity-80 transition duration-500 ease-in-out"
                  onClick={() => toggleNameUpdate(item)}
                >
                  <span>{pencilIcon}</span>
                </button>
              </div>
              <div className="flex items-center justify-center col-start-5 col-span-4">
                <span className="m-2 px-2">{item.description}</span>
                <button
                  className="opacity-20 hover:opacity-100 transition duration-150"
                  onClick={() => toggleDescUpdate(item)}
                >
                  <span>{pencilIcon}</span>
                </button>
              </div>
              <div className="col-start-12">
                <button
                  className="font-medium mx-2 bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center text-4xl font-semibold items-center translate-y-32">
          <Link to="/login" className="pr-2 font-semibold hover:underline">
            Login
          </Link>
          to see your restaurants!
        </div>
      )}
    </div>
  );
}
