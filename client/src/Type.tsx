import { Dispatch } from "react";

export interface Restaurant {
  name: string;
  description: string;
  user_id: number;
}
export interface TriedRestaurant extends Restaurant {
  id: number;
}
export interface TotalRestaurant extends Restaurant {
  id: number;
}

export interface GlobalState {
  auth: Boolean;
  username: string;
  user_id: Number;
  totalData: TotalRestaurant[];
  triedData: TriedRestaurant[];
  token: string;
}

export interface Props {
  table?: string;
  setOpenModal?: Function;
  id?: number;
  pageType?: string;
  setHeaderBG?: (value: string) => void;
  headerBG?: string;
}
