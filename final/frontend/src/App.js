import React from "react"
import { Routes, BrowserRouter as Router, Route} from "react-router-dom";
//import { Redirect } from "react-router-dom";

import './App.css';
import ButtonAppBar from "./Components/AppBar";
import SignInSide from "./Components/LogIn";
import Header from "./Components/HomePage"; 
// import Main from "./Containers/main"
// import Login from "./Containers/login"
// import CustomAppBar from "./Containers/customAppBar";


const RouteS =()=>{
  return (
    <Routes>
      <Route exact path="/" component={Header}>
        < Header/>
      </Route>
      <Route exact path="/login" component={SignInSide}>
        <SignInSide />
      </Route>
      {/* <Redirect to="/login"/> */}
    </Routes>
  );
}

export default function App() {
  return (
    <div>
      <Router>
        <ButtonAppBar>
          <RouteS/>
        </ButtonAppBar>
      </Router>
    </div>
  );
}


