import React, { useState, useEffect } from "react";
import TotalV2 from "./TotalV2";
import TriedV1 from "./TriedV1";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkForToken = () => {
    if (!localStorage.getItem("token ")) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);
  return (
    <div>
      {loggedIn ? (
        <div>
          <TotalV2 />
          <TriedV1 />
        </div>
      ) : (
        <div>Log in to see restaurants!</div>
      )}
    </div>
  );
}
