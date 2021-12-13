import React, { useState } from "react";
import Axios from "axios";

export default function Home() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
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
  };

  const removeItem = (name) => {
    Axios.delete(`http://localhost:3001/remove/${name}`, {});
  };

  const updateRestName = (e) => {
    setRestName(e.target.value);
  };
  const updateRestDesc = (e) => {
    setRestDesc(e.target.value);
  };

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
          <div className="home" key={item.idx}>
            <p className="total-names">{item.name}</p>
            <p className="total-description">{item.description}</p>
            <button onClick={() => removeItem(item.name)}>REMOVE</button>
          </div>
        );
      })}
    </div>
  );
}
