import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTriedDataAction,
  triedDataAction,
} from "../actions/triedDataAction";
import { pencilIcon } from "../icons/icons";
import { GlobalState, TriedRestaurant } from "../Type";
import AddAction from "./AddAction";
import { apiClient } from "./ApiClient";
import EditModal from "./EditModal";

export default function TriedV1() {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const triedData = useSelector((state: GlobalState) => state.triedData);
  const username = useSelector((state: GlobalState) => state.username);
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const token = useSelector((state: GlobalState) => state.token);

  const getData = async () => {
    if (user_id !== null) {
      const response = await apiClient.get(`/tried/${user_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (triedData.length === 0) {
        dispatch(triedDataAction(response.data));
      }
    }
  };

  const removeItem = async (item: TriedRestaurant) => {
    const response = await apiClient.delete(`/tried/remove/${item.id}`);
    const id = parseInt(response.data.id);
    dispatch(removeTriedDataAction(id));
  };

  useEffect(() => {
    getData();
  }, [username]);

  return (
    <div style={{ height: "100vh" }} className="fade-in ">
      {openModal && (
        <EditModal setOpenModal={setOpenModal} id={id} pageType={"tried"} />
      )}
      {loggedIn && triedData ? (
        <div className="total-page">
          <AddAction table={"tried"} />
          <div>
            {triedData.map((item, index) => {
              return (
                <div key={index} className="flex justify-around">
                  <div
                    style={{ width: "80%" }}
                    className="p-2 hover:bg-blue-500 rounded hover:bg-opacity-80 transition duration-200"
                  >
                    <div className="flex justify-between ">
                      <div className="flex justify-center w-3/12 items-center">
                        <span className="text-center">{item.name}</span>
                      </div>
                      <div className="flex items-center justify-center w-4/12">
                        <span className="text-center">{item.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setId(item.id);
                          }}
                          className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                        >
                          Edit
                        </button>
                        <button
                          className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                          onClick={() => removeItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-4xl font-semibold items-center translate-y-32">
          Login to see your restaurants!
        </div>
      )}
    </div>
  );
}
