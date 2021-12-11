import React from "react"
import { Routes, BrowserRouter as Router, Route} from "react-router-dom";
import { Redirect } from "react-router-dom";

import './App.css';
import ButtonAppBar from "./Components/AppBar";
import SignInSide from "./Components/LogIn";
import Header from "./Components/HomePage"; 
import { useStock } from "./context/useStock";
import MainRoute from "./routes/mainRoute";
// import Main from "./Containers/main"
// import Login from "./Containers/login"
// import CustomAppBar from "./Containers/customAppBar";


const RouteS =()=>{
  const {SignedIn} = useStock()
  return (
    <Routes>
      <Route exact path="/" element={<MainRoute/>}>
      </Route>
      <Route exact path="/login" element={<SignInSide/>}>
      </Route>
      <Route path="*" element={<SignInSide/>}></Route>
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


