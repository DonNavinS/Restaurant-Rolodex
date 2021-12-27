import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addTriedDataAction,
  removeTriedDataAction,
  triedDataAction,
} from "../actions/triedDataAction";

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
      // const ids = triedData.map((item) => item.idtried);
      if (
        // !ids.includes(response.data[response.data.length - 1].idtried) ||
        triedData.length === 0
      ) {
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

  const removeData = async (item) => {
    const response = await Axios.delete(
      `http://localhost:3001/tried/remove/${item.idtried}`
    );
    const id = parseInt(response.data.idtried);
    dispatch(removeTriedDataAction(id));
  };

  const updateName = (item) => {
    Axios.put(`http://localhost:3001/tried/update/name/${item.idtried}`, {
      newName: newName,
    });
  };

  const updateDesc = (item) => {
    Axios.put(
      `http://localhost:3001/tried/update/description/${item.idtried}`,
      {
        newDesc: newDesc,
      }
    );
    window.location.reload();
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
      {triedData.map((item) => {
        return (
          <div key={item.idtotal}>
            <div>{item.name}</div>
            <input type="text" onChange={updateNewName} />
            <button onClick={() => updateName(item)}>EDIT NAME</button>
            <div>{item.description}</div>
            <input type="text" onChange={updateNewDesc} />
            <button onClick={() => updateDesc(item)}>EDIT DESCRIPTION</button>
            <button onClick={() => removeData(item)}>REMOVE</button>
          </div>
        );
      })}
    </div>
  );
}
