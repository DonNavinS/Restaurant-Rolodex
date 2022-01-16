import React, { useEffect, useState } from "react";
import { apiClient } from "./ApiClient";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await apiClient.get(`/total/${user_id}`);
    if (totalData.length === 0) {
      dispatch(totalDataAction(response.data));
      dispatch(wipeTriedData());
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
    <div>
      <div className="flex justify-center p-2">
        <button
          className="bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out mx-2"
          onClick={postData}
        >
          POST
        </button>
        <input
          className="mr-2 p-1 rounded"
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

      {totalData.map((item, index) => {
        return (
          <div
            className="grid gap-x-10 justify-items-center grid-cols-3 mx-60  "
            key={index}
          >
            <div className="px-6 my-2 flex">
              <span className="ml-6 mr-1">{item.name}</span>
              <button
                className="opacity-20 hover:opacity-80"
                onClick={() => toggleNameUpdate(item)}
              >
                <span>{pencilIcon}</span>
              </button>
            </div>
            <div className="mx-6 my-2 flex">
              <span className="m-2 px-2">{item.description}</span>
              <button
                className="opacity-20 hover:opacity-100 transition duration-150"
                onClick={() => toggleDescUpdate(item)}
              >
                <span>{pencilIcon}</span>
              </button>
            </div>
            <div className="px-6 my-2">
              <button
                className=" mx-2 bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
                onClick={() => removeItem(item)}
              >
                Remove
              </button>
              <button
                className=" mx-2 bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
                onClick={() => moveToTried(item)}
              >
                Move To Tried
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
