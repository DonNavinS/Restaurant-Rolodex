import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import TotalV1 from "./Components/TotalV1";
import TotalV2 from "./Components/TotalV2";
import TriedV1 from "./Components/TriedV1";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useDispatch } from "react-redux";
import usernameAction from "./actions/usernameActions";
import { useEffect } from "react";
import { loginAction } from "./actions/authActions";
import { idAction } from "./actions/IdAction";
function App() {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const updateRedux = () => {
    if (username && user_id) {
      dispatch(usernameAction(username));
      dispatch(loginAction());
      dispatch(idAction(user_id));
    } else {
      console.log("NOTHING TO UPDATE");
    }
  };

  useEffect(() => {
    updateRedux();
  });

  return (
    <Router>
      <div>
        <div>
          <Header />
        </div>
        <div className="App">
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/total">
              <TotalV2 />
            </Route>
            <Route exact path="/tried">
              <TriedV1 />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
