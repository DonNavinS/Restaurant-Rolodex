import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import TotalV2 from "./Components/TotalV2";
import TriedV1 from "./Components/TriedV1";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { usernameAction } from "./actions/usernameActions";
import { loginAction } from "./actions/authActions";
import { idAction } from "./actions/IdAction";

function App() {
  const [headerBG, setHeaderBG] = useState("");

  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");

  const updateRedux = () => {
    if (username) {
      dispatch(usernameAction(username));
      dispatch(idAction(parseInt(user_id!)));
      dispatch(loginAction());
    } else {
      console.log("NOTHING TO UPDATE");
    }
  };

  useEffect(() => {
    updateRedux();
  });

  return (
    <Router>
      <div className="bg-zinc-200 min-h-screen w-full fade-in">
        <Header setHeaderBG={setHeaderBG} headerBG={headerBG} />
        <div className="App">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/total" component={TotalV2} />
            <Route exact path="/tried" component={TriedV1} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Redirect to={"/home"} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
