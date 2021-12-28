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
import {
  updateTotalDataDescription,
  updateTotalDataName,
} from "../actions/totalDataAction";

export default function TriedV1() {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const dispatch = useDispatch();

  const triedData = useSelector((state) => state.triedData);
  const username = useSelector((state) => state.username);
  const user_id = useSelector((state) => state.user_id);

  const getData = async () => {
    if (user_id !== null) {
      const response = await Axios.get(
        `http://localhost:3001/tried/${user_id}`
      );
      if (triedData.length === 0) {
        dispatch(triedDataAction(response.data));
      }
    }
  };

  const postData = async () => {
    const response = await Axios.post("http://localhost:3001/tried/add", {
      name: newName,
      description: newDesc,
      username: username,
      user_id: user_id,
    });
    console.log(response.data);
    dispatch(addTriedDataAction(response.data));
    setNewDesc("");
    setNewName("");
  };

  const removeItem = async (item) => {
    const response = await Axios.delete(
      `http://localhost:3001/tried/remove/${item.idtried}`
    );
    const id = parseInt(response.data.idtried);
    dispatch(removeTriedDataAction(id));
  };

  const toggleNameUpdate = async (item) => {
    let updatedName = prompt("Enter new Restaurant Name");
    if (updatedName === null) {
      alert("No changes made");
    } else {
      Axios.put(`http://localhost:3001/tried/update/name/${item.idtried}`, {
        newName: updatedName,
      });
      dispatch(updateTriedName(item.idtried, updatedName));
    }
  };

  const toggleDescUpdate = (item) => {
    let updatedDesc = prompt("Enter new Description");
    if (!updatedDesc) {
      alert("No changes made");
    } else {
      Axios.put(
        `http://localhost:3001/tried/update/description/${item.idtried}`,
        { newDesc: updatedDesc }
      );
      dispatch(updateTriedDescription(item.idtried, updatedDesc));
    }
  };
  const updateNewName = (e) => {
    setNewName(e.target.value);
  };
  const updateNewDesc = (e) => {
    setNewDesc(e.target.value);
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [username]);

  return (
    <div className="tried-table">
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      <input
        value={newName}
        placeholder="New Name"
        type="text"
        onChange={updateNewName}
      />
      <input
        value={newDesc}
        placeholder="New Desc"
        type="text"
        onChange={updateNewDesc}
      />
      {triedData.map((item, index) => {
        return (
          <div className="total-page" key={index}>
            <p className="total-names">{item.name}</p>
            <button onClick={() => toggleNameUpdate(item)}>Edit</button>
            <p className="total-description">{item.description}</p>
            <button onClick={() => toggleDescUpdate(item)}>Edit</button>
            <button onClick={() => removeItem(item)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
