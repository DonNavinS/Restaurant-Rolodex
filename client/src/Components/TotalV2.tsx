import React, { useEffect, useState } from "react";
import { apiClient } from "./ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { removeDataAction, totalDataAction } from "../actions/totalDataAction";
import { addTriedDataAction } from "../actions/triedDataAction";
import { TotalRestaurant, GlobalState } from "../Type";
import { pencilIcon } from "../icons/icons";
import AddAction from "./AddAction";
import EditModal from "./EditModal";

export default function TotalV2() {
  const user_id = useSelector((state: GlobalState) => state.user_id);
  const username = useSelector((state: GlobalState) => state.username);
  const totalData = useSelector((state: GlobalState) => state.totalData);
  const loggedIn = useSelector((state: GlobalState) => state.auth);
  const token = useSelector((state: GlobalState) => state.token);

  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await apiClient.get(`/total/${user_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (totalData.length === 0) {
      dispatch(totalDataAction(response.data));
      console.log(response);
    }
  };

  const removeItem = async (item: TotalRestaurant) => {
    const response = await apiClient.delete(`/total/remove/${item.id}`);
    dispatch(removeDataAction(parseInt(response.data.id)));
  };

  const moveToTried = async (item: TotalRestaurant) => {
    removeItem(item);
    const response = await apiClient.post("/tried/add", {
      name: item.name,
      description: item.description,
      username: username,
      user_id: user_id,
    });
    dispatch(addTriedDataAction(response.data));
  };

  useEffect(() => {
    getData();
  }, [user_id]);
  return (
    <div style={{ height: "100vh" }} className="fade-in ">
      {openModal && (
        <EditModal setOpenModal={setOpenModal} id={id} pageType={"total"} />
      )}
      {loggedIn && totalData ? (
        <div className="total-page">
          <AddAction table={"total"} />
          <div>
            {totalData.map((item, index) => {
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
                            console.log(item);
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
                        <button
                          className="font-medium bg-red-400 rounded hover:bg-red-500 hover:text-white  p-1 transition duration-200 ease-in-out"
                          onClick={() => moveToTried(item)}
                        >
                          Move to Tried
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
