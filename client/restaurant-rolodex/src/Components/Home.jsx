import React, { useState } from "react";

export default function Home() {
  const [retrievedData, setRetrievedData] = useState([]);
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
    fetch("http://localhost:3001/add", {
      method: "POST",
      mode: "cors",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      {retrievedData.map((item) => {
        return <p>{item.name}</p>;
      })}
    </div>
  );
}
