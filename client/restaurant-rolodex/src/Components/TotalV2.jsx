import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

export default function TotalV2() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const username = useSelector((state) => state.username);
  const user_id = useSelector((state) => state.user_id);

  const getData = () => {
    fetch(`http://localhost:3001/total/${user_id}`, {
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
      username: username,
    });
    window.location.reload();
  };

  const removeItem = (item) => {
    Axios.delete(`http://localhost:3001/total/remove/${item.idtotal}`, {});
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
      Axios.put(`http://localhost:3001/total/update/name/${item.idtotal}`, {
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
        `http://localhost:3001/total/update/description/${item.idtotal}`,
        { newDesc: updatedDesc }
      );
    }
    window.location.reload();
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
  }, []);
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
