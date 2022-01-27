import React, { useEffect, useState } from "react";
import { apiClient } from "./ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addDataAction,
  removeDataAction,
  totalDataAction,
  updateTotalDataDescription,
  updateTotalDataName,
} from "../actions/totalDataAction";
import { wipeTriedData } from "../actions/triedDataAction";
import { TotalRestaurant, GlobalState } from "../Type";
import { pencilIcon } from "../icons/icons";

export default function TotalV2() {
  // const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const username = useSelector((state: GlobalState) => state.username);
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const totalData = useSelector((state: GlobalState) => state.totalData);
  const loggedIn = useSelector((state: GlobalState) => state.auth);

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await apiClient.get(`/total/${user_id}`);
    if (totalData.length === 0) {
      dispatch(totalDataAction(response.data));
      // dispatch(wipeTriedData());
    }
  };

  const postData = async () => {
    const response = await apiClient.post("/total/add", {
      name: restName,
      description: restDesc,
      username: username,
      user_id: user_id,
    });
    dispatch(addDataAction(response.data));
    setRestName("");
    setRestDesc("");
  };

  const removeItem = async (item: TotalRestaurant) => {
    const response = await apiClient.delete(`/total/remove/${item.idtotal}`);
    dispatch(removeDataAction(parseInt(response.data.id)));
  };

  const updateRestName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRestName(e.target.value);
  };
  const updateRestDesc = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRestDesc(e.target.value);
  };

  const toggleNameUpdate = async (item: TotalRestaurant) => {
    let updatedName = prompt("Enter new Restaurant Name");

    if (updatedName === null) {
      alert("No changes made");
    } else {
      apiClient.put(`/total/update/name/${item.idtotal}`, {
        newName: updatedName,
      });
      dispatch(updateTotalDataName(item.idtotal, updatedName));
    }
  };

  const toggleDescUpdate = (item: TotalRestaurant) => {
    let updatedDesc = prompt("Enter new Description");
    if (!updatedDesc) {
      alert("No changes made");
    } else {
      apiClient.put(`/total/update/description/${item.idtotal}`, {
        newDesc: updatedDesc,
      });
      dispatch(updateTotalDataDescription(item.idtotal, updatedDesc));
    }
  };

  const moveToTried = (item: TotalRestaurant) => {
    removeItem(item);
    apiClient.post("/tried/add", {
      name: item.name,
      description: item.description,
      username: username,
    });
    console.log(item);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
  return (
    <div className="font-medium">
      {loggedIn && (
        <div className="flex justify-center p-2">
          <button
            className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white py-1 px-2 transition duration-200 ease-in-out mx-2"
            onClick={postData}
          >
            POST
          </button>
          <input
            className="mx-2 p-1 rounded"
            placeholder="Restaurant Name"
            type="text"
            name="totalName"
            value={restName}
            onChange={updateRestName}
          />
          <input
            className="p-1 rounded"
            placeholder="Restaurant Description"
            type="text"
            value={restDesc}
            name="totalDesc"
            onChange={updateRestDesc}
          />
        </div>
      )}

      {loggedIn && totalData ? (
        totalData.map((item, index) => {
          return (
            <div
              className="grid grid-cols-12 items-center rounded mx-4 p-1 hover:bg-blue-500 hover:bg-opacity-80 transition duration-200"
              key={index}
            >
              <div className="flex items-center col-start-2 h-fit">
                <span className="p-2">{item.name}</span>
                <button
                  className="opacity-20 hover:opacity-80"
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
              <div className="col-start-11 col-span-2">
                <button
                  className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                  onClick={() => moveToTried(item)}
                >
                  Move To Tried
                </button>
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
