import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function TotalV1() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const getData = () => {
    fetch("http://localhost:3001/total", {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRetrievedData(data);
      });
  };

  const postData = () => {
    Axios.post("http://localhost:3001/add", {
      name: restName,
      description: restDesc,
    });
    window.location.reload();
  };

  const removeItem = (item) => {
    Axios.delete(`http://localhost:3001/remove/${item.name}`, {});
    window.location.reload();
  };

  const updateName = (item) => {
    Axios.put(`http://localhost:3001/update/name/${item.name}`, {
      newName: newName,
    });
    window.location.reload();
  };

  const updateDesc = (item) => {
    Axios.put(`http://localhost:3001/update/description/${item.description}`, {
      newDesc: newDesc,
    });
    window.location.reload();
  };

  const updateRestName = (e) => {
    setRestName(e.target.value);
  };
  const updateRestDesc = (e) => {
    setRestDesc(e.target.value);
  };

  const updateNewName = (e) => {
    setNewName(e.target.value);
  };

  const updateNewDesc = (e) => {
    setNewDesc(e.target.value);
  };

  useEffect(getData, []);
  return (
    <div className="total-table">
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      <input
        placeholder="Restaurant Name"
        type="text"
        name="totalName"
        onChange={updateRestName}
      />
      <input
        placeholder="Restaurant Description"
        type="text"
        name="totalDesc"
        onChange={updateRestDesc}
      />

      {retrievedData.map((item) => {
        return (
          <div key={item.idtotal}>
            <p>{item.name}</p>
            <input type="text" onChange={updateNewName} />
            <button onClick={() => updateName(item)}>EDIT NAME</button>
            <p>{item.description}</p>
            <input type="text" onChange={updateNewDesc} />
            <button onClick={() => updateDesc(item)}>EDIT DESCRIPTION</button>
            <button onClick={() => removeItem(item)}>REMOVE</button>
          </div>
        );
      })}
    </div>
  );
}
