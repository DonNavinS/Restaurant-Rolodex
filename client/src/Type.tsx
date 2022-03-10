export interface Restaurant {
  name: string;
  description: string;
  user_id: number;
}
export interface TriedRestaurant extends Restaurant {
  idtried: number;
}
export interface TotalRestaurant extends Restaurant {
  idtotal: number;
}

export interface GlobalState {
  auth: Boolean;
  username: string;
  user_id: Number;
  totalData: TotalRestaurant[];
  triedData: TriedRestaurant[];
}

export interface Props {
  table?: string;
  setOpenModal?: Function;
  id?: number;
  pageType?: string;
}
