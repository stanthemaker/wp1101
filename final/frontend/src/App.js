import React, { useEffect } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { Redirect, useHistory } from 'react-router'

import './App.css'
import ButtonAppBar from './Components/AppBar'
import SignInSide from './Components/LogIn'
import Header from './Components/HomePage'
import { useStock } from './context/useStock'
import MainRoute from './routes/mainRoute'
import LoginRoute from './routes/loginRoute'
import Album from './Components/Myfavorite'
import SignUp from './Components/Register'
import Model from './Components/Model'

// import Main from "./Containers/main"
// import Login from "./Containers/login"
// import CustomAppBar from "./Containers/customAppBar";

const Routes = () => {
  // let navigate = useNavigate();
  // const navigation = useRef(useNavigate());
  const { SignedIn , verifyToken} = useStock()
  const history = useHistory()
  useEffect(() => {
    const fetchData = async ()=>{
      await verifyToken();
      console.log("verifytoken")
      SignedIn ? history.push('/') : history.push('/login')
    }    
    fetchData()
  }, [SignedIn])

  return (
    // SignedIn? <Route exact path="/login" element={<SignInSide/>}>
    // </Route>:
    <Switch>
      <MainRoute exact path="/">
        <Header />
      </MainRoute>
      <LoginRoute exact path="/login">
        <SignInSide />
      </LoginRoute>
      <MainRoute exact path="/myfavorite">
        <Album />
      </MainRoute>
      <MainRoute exact path="/model">
        <Model />
      </MainRoute>
      <LoginRoute exact path="/signup">
        <SignUp />
      </LoginRoute>
      {/* <Route exact path="/" element={<MainRoute/>}>
      </Route>
      <Route exact path="/login" element={<SignInSide/>}>
      </Route>
      <Route exact path="/myfavorite" element={<Album/>}></Route>
      <Route exact path="/model" element={<Album/>}></Route> */}
      {/* <Route path="*" element={<Navigate replace to="/login"/>}></Route> */}
      <Redirect to="/login" />
    </Switch>
  )
}

export default function App() {
  return (
    <div>
      <Router>
        <ButtonAppBar>
          <Routes />
        </ButtonAppBar>
      </Router>
    </div>
  )
}
