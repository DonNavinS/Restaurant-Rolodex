import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function TotalV2() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");

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
    Axios.post("http://localhost:3001/total/add", {
      name: restName,
      description: restDesc,
    });
    window.location.reload();
  };

  const removeItem = (item) => {
    Axios.delete(`http://localhost:3001/total/remove/${item.name}`, {});
    window.location.reload();
  };

  const updateRestName = (e) => {
    setRestName(e.target.value);
  };
  const updateRestDesc = (e) => {
    setRestDesc(e.target.value);
  };

  const toggleNameUpdate = (item) => {
    let updatedName = prompt("TEST");
    if (updatedName === null) {
      alert("No changes made");
    } else {
      Axios.put(`http://localhost:3001/total/update/name/${item.name}`, {
        newName: updatedName,
      });
      window.location.reload();
    }
  };

  const toggleDescUpdate = (item) => {
    let updatedDesc = prompt("Enter new Description");
    if (updatedDesc === null) {
      alert("No changes made");
    } else {
      Axios.put(
        `http://localhost:3001/total/update/description/${item.description}`,
        { newDesc: updatedDesc }
      );
    }
    window.location.reload();
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
          <div className="total-page" key={item.idtotal}>
            <p className="total-names">{item.name}</p>
            <button onClick={() => toggleNameUpdate(item)}>EDIT</button>
            <p className="total-description">{item.description}</p>
            <button onClick={() => toggleDescUpdate(item)}>EDIT</button>
            <button onClick={() => removeItem(item)}>REMOVE</button>
          </div>
        );
      })}
    </div>
  );
}
