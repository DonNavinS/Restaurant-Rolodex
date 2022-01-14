import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addTriedDataAction,
  removeTriedDataAction,
  triedDataAction,
  updateTriedDescription,
  updateTriedName,
} from "../actions/triedDataAction";
import { GlobalState, TriedRestaurant } from "../Type";
import { apiClient } from "./ApiClient";

export default function TriedV1() {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const dispatch = useDispatch();

  const triedData = useSelector((state: GlobalState) => state.triedData);
  const username = useSelector((state: GlobalState) => state.username);
  const user_id = useSelector((state: GlobalState) => state.user_id);

  const getData = async () => {
    if (user_id !== null) {
      const response = await Axios.get(
        "https://restaurant-rolodex.herokuapp.com/api/tried/4"
      );
      if (triedData.length === 0 && response.data.length < 100) {
        dispatch(triedDataAction(response.data));
      }
    }
  };

  const postData = async () => {
    const response = await Axios.post("/tried/add", {
      name: newName,
      description: newDesc,
      username: username,
      user_id: user_id,
    });
    dispatch(addTriedDataAction(response.data));
    setNewDesc("");
    setNewName("");
  };

  const removeItem = async (item: TriedRestaurant) => {
    const response = await Axios.delete(`/tried/remove/${item.idtried}`);
    const id = parseInt(response.data.idtried);
    dispatch(removeTriedDataAction(id));
  };

  const toggleNameUpdate = (item: TriedRestaurant) => {
    let updatedName = prompt("Enter new Restaurant Name");
    if (updatedName === null) {
      alert("No changes made");
    } else {
      Axios.put(`/tried/update/name/${item.idtried}`, {
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
      Axios.put(`/tried/update/description/${item.idtried}`, {
        newDesc: updatedDesc,
      });
      dispatch(updateTriedDescription(item.idtried, updatedDesc));
    }
  };
  const updateNewName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewName(e.target.value);
  };
  const updateNewDesc = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewDesc(e.target.value);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [username]);

  return (
    <div>
      <div className="flex justify-center p-2">
        <button
          className="bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
          onClick={getData}
        >
          GET
        </button>
        <button
          className="bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out mx-2"
          onClick={postData}
        >
          POST
        </button>
        <input
          className="mr-2 p-1 rounded"
          value={newName}
          placeholder="Restaurant Name"
          type="text"
          onChange={updateNewName}
        />
        <input
          className=" p-1 rounded"
          value={newDesc}
          placeholder="Restaurant Description"
          type="text"
          onChange={updateNewDesc}
        />
      </div>
      {triedData &&
        triedData.map((item, index) => {
          return (
            <div
              className="grid grid-cols-3 justify-items-center mx-60"
              key={index}
            >
              <div className="px-6 my-2">
                <span className="pl-11 m-2 ">{item.name}</span>
                <button
                  className="bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
                  onClick={() => toggleNameUpdate(item)}
                >
                  Edit Name
                </button>
              </div>
              <div className="my-2">
                <span className="px-2 m-2 ">{item.description}</span>
                <button
                  className="bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
                  onClick={() => toggleDescUpdate(item)}
                >
                  Edit Description
                </button>
              </div>
              <div className="my-2">
                <button
                  className=" mx-2 bg-blue-300 rounded hover:bg-blue-500  p-1 transition duration-300 ease-in-out"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
