import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataAction,
  removeDataAction,
  totalDataAction,
  updateTotalDataAction,
} from "../actions/totalDataAction";

export default function TotalV2() {
  // const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const username = useSelector((state) => state.username);
  const user_id = useSelector((state) => state.user_id);
  const totalData = useSelector((state) => state.totalData);

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await Axios.get(`http://localhost:3001/total/${user_id}`);
    if (totalData.length === 0) {
      dispatch(totalDataAction(response.data));
    }
  };

  const postData = async () => {
    const response = await Axios.post("http://localhost:3001/total/add", {
      name: restName,
      description: restDesc,
      username: username,
      user_id: user_id,
    });
    console.log(response);
    dispatch(addDataAction(response.data));
    setRestName("");
    setRestDesc("");
  };

  const removeItem = async (item) => {
    const response = await Axios.delete(
      `http://localhost:3001/total/remove/${item.idtotal}`
    );
    dispatch(removeDataAction(parseInt(response.data.id)));
  };

  const updateRestName = (e) => {
    setRestName(e.target.value);
  };
  const updateRestDesc = (e) => {
    setRestDesc(e.target.value);
  };

  const toggleNameUpdate = async (item) => {
    let updatedName = prompt("TEST");
    if (updatedName === null) {
      alert("No changes made");
    } else {
      Axios.put(`http://localhost:3001/total/update/name/${item.idtotal}`, {
        newName: updatedName,
      });
      dispatch(updateTotalDataAction(item.idtotal, updatedName));
    }
  };

  const toggleDescUpdate = (item) => {
    let updatedDesc = prompt("Enter new Description");
    if (!updatedDesc) {
      alert("No changes made");
    } else {
      Axios.put(
        `http://localhost:3001/total/update/description/${item.idtotal}`,
        { newDesc: updatedDesc }
      );
    }
  };

  const moveToTried = (item) => {
    removeItem(item);
    Axios.post("http://localhost:3001/tried/add", {
      name: item.name,
      description: item.description,
      username: item.username,
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);
  return (
    <div>
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      <input
        placeholder="Restaurant Name"
        type="text"
        name="totalName"
        value={restName}
        onChange={updateRestName}
      />
      <input
        placeholder="Restaurant Description"
        type="text"
        value={restDesc}
        name="totalDesc"
        onChange={updateRestDesc}
      />

      {totalData.map((item, index) => {
        return (
          <div className="total-page" key={index}>
            <p className="total-names">{item.name}</p>
            <button onClick={() => toggleNameUpdate(item)}>Edit</button>
            <p className="total-description">{item.description}</p>
            <button onClick={() => toggleDescUpdate(item)}>Edit</button>
            <button onClick={() => removeItem(item)}>Remove</button>
            <button onClick={() => moveToTried(item)}>Move To Tried</button>
          </div>
        );
      })}
    </div>
  );
}
