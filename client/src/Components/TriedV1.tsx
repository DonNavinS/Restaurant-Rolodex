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
    <div className="fade-in">
      {loggedIn && triedData ? (
        <div className="total-page">
          <AddAction table={"total"} />
          <div>
            {triedData.map((item, index) => {
              return (
                <div className="flex justify-around">
                  <div
                    style={{ width: "80%" }}
                    className="p-2 hover:bg-blue-500 rounded hover:bg-opacity-80 transition duration-200"
                    key={index}
                  >
                    <div className="flex justify-between ">
                      <div className="flex justify-center w-3/12 items-center">
                        <span className="text-center">{item.name}</span>
                      </div>
                      <div className="flex items-center justify-center w-4/12">
                        <span className="text-center">{item.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out">
                          Edit
                        </button>
                        <button
                          className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                          onClick={() => removeItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
  );
}
