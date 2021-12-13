import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Home() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const [newName, setNewName] = useState("");
  const getData = () => {
    fetch("http://localhost:3001", {
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

  const updateData = (item) => {
    Axios.put(`http://localhost:3001/update/${item.name}`, {
      newName: newName,
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

  useEffect(getData, []);
  return (
    <div>
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
          <div className="home" key={item.idtotal}>
            <p className="total-names">{item.name}</p>
            <input type="text" onChange={updateNewName} />
            <button onClick={() => updateData(item)}>UPDATE</button>
            <p className="total-description">{item.description}</p>
            <button onClick={() => removeItem(item)}>REMOVE</button>
          </div>
        );
      })}
    </div>
  );
}
