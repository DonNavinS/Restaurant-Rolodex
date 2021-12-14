import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function TriedV1() {
  const [retrievedData, setRetrievedData] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const getData = () => {
    Axios.get("http://localhost:3001/tried").then((response) => {
      setRetrievedData(response.data);
    });
  };

  const postData = () => {
    Axios.post("http://localhost:3001/tried/add", {
      name: newName,
      description: newDesc,
    });
    window.location.reload();
  };

  const removeData = (item) => {
    Axios.delete(`http://localhost:3001/tried/remove/${item.name}`);
    window.location.reload();
  };

  const updateName = (item) => {
    Axios.put(`http://localhost:3001/tried/update/name/${item.name}`, {
      newName: newName,
    });
    window.location.reload();
  };

  const updateDesc = (item) => {
    Axios.put(
      `http://localhost:3001/tried/update/description/${item.description}`,
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
  }, []);
  return (
    <div className="tried-table">
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      <input placeholder="New Name" type="text" onChange={updateNewName} />
      <input placeholder="New Desc" type="text" onChange={updateNewDesc} />
      {retrievedData.map((item) => {
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
