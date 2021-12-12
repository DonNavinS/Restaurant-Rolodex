import React from "react";

export default function Home() {
  const getData = () => {};

  const postData = () => {
    fetch("http://localhost:3001/add", {
      method: "POST",
      mode: "no-cors",
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
    </div>
  );
}
