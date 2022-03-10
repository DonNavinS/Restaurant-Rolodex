import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDataAction } from "../actions/totalDataAction";
import { GlobalState } from "../Type";
import { apiClient } from "./ApiClient";
import { Props } from "../Type";
import { addTriedDataAction } from "../actions/triedDataAction";

const AddAction: React.FC<Props> = ({ table }) => {
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const username = useSelector((state: GlobalState) => state.username);
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const dispatch = useDispatch();

  const postData = async () => {
    const response = await apiClient.post(`/${table}/add`, {
      name: restName,
      description: restDesc,
      username: username,
      user_id: user_id,
    });

    console.log(response);

    table === "total"
      ? dispatch(addDataAction(response.data))
      : dispatch(addTriedDataAction(response.data));
    setRestName("");
    setRestDesc("");
  };
  return (
    <div>
      <div className="flex justify-center p-2">
        <button
          className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white py-1 px-2 transition duration-200 ease-in-out mx-2"
          onClick={postData}
        >
          POST
        </button>
        <input
          className="mx-2 p-1 rounded"
          placeholder="Restaurant Name"
          type="text"
          name="totalName"
          value={restName}
          onChange={(e) => setRestName(e.target.value)}
        />
        <input
          className="p-1 rounded"
          placeholder="Restaurant Description"
          type="text"
          value={restDesc}
          name="totalDesc"
          onChange={(e) => setRestDesc(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddAction;
