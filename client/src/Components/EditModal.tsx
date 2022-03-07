import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTriedData } from "../actions/triedDataAction";
import { Props } from "../Type";

const EditModal: React.FC<Props> = ({ setOpenModal, item }) => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const dispatch = useDispatch();

  const update = (id: number, name: string, description: string) => {
    dispatch(updateTriedData(id, name, description));
  };

  return (
    <div className="absolute inset-20 z-50 bg-red-300">
      <input
        type="text"
        placeholder="New Name"
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Description"
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <div>{item}</div>
      <button
        onClick={() => {
          update(item!, newName, newDescription);
          setOpenModal?.(false);
        }}
      >
        Update
      </button>
      <button onClick={() => setOpenModal?.(false)}>Close</button>
    </div>
  );
};

export default EditModal;
