import React from "react"
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";
import { Redirect } from "react-router-dom";

import './App.css';
import Main from "./Containers/main"
import Login from "./Containers/login"
import CustomAppBar from "./Containers/customAppBar";

const Routes =()=>{
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Redirect to="/login"/>
    </Switch>
  );
}

export default function App() {
  return (
    <div>
      <Router>
        <CustomAppBar>
          <Routes/>
        </CustomAppBar>
      </Router>
    </div>
  );
}


