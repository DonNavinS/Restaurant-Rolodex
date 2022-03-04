export interface Restaurant {
  name: String;
  description: String;
  user_id: Number;
}
export interface TriedRestaurant extends Restaurant {
  idtried: Number;
}
export interface TotalRestaurant extends Restaurant {
  idtotal: Number;
}

export interface GlobalState {
  auth: Boolean;
  username: String;
  user_id: Number;
  totalData: TotalRestaurant[];
  triedData: TriedRestaurant[];
}

export interface Props {
  table: String;
}
