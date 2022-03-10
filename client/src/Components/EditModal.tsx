import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTotalData } from "../actions/totalDataAction";
import { updateTriedData } from "../actions/triedDataAction";
import { Props } from "../Type";
import { apiClient } from "./ApiClient";

const EditModal: React.FC<Props> = ({ setOpenModal, id, pageType }) => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const dispatch = useDispatch();

  const update = (id: number, name: string, description: string) => {
    apiClient
      .put(`/${pageType}/update/${id}`, {
        name: newName,
        description: newDescription,
      })
      .then((response) => console.log(response));
    pageType === "tried"
      ? dispatch(updateTriedData(id, name, description))
      : pageType === "total"
      ? dispatch(updateTotalData(id, name, description))
      : null;
  };

  return (
    <div
      className="absolute inset-0 z-50 fade-in"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div className="fade-in absolute inset-1/4 z-40 bg-zinc-200 rounded-lg shadow-lg flex flex-col justify-around items-center gap-y-4">
        <h1 className="font-semibold text-2xl">Update Restaurant</h1>
        <div className="flex gap-x-4 ">
          <input
            type="text"
            placeholder="New Name"
            onChange={(e) => setNewName(e.target.value)}
            className="rounded p-1"
          />
          <input
            type="text"
            placeholder="New Description"
            onChange={(e) => setNewDescription(e.target.value)}
            className="rounded p-1"
          />
        </div>
        <div className="flex gap-x-4">
          <button
            className="border-2 border-zinc-700 text-zinc-700 p-1 rounded-lg hover:text-white hover:bg-zinc-700  transition duration-200"
            onClick={() => {
              update(id!, newName, newDescription);
              setOpenModal?.(false);
            }}
          >
            Update
          </button>
          <button
            className="border-2 border-zinc-700 text-zinc-700 p-1 rounded-lg hover:text-white hover:bg-zinc-700  transition duration-200"
            onClick={() => setOpenModal?.(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
