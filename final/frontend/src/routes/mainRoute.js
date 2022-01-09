import React from "react";
import { Route } from "react-router-dom";
// import { useStock } from "../context/useStock";
// import Header from "../Components/HomePage";


export default function MainRoute({path, children}){
    // const {signedIn} = useStock()

    return(
        <Route exact path={path}
            render={()=>{
                return children
            }}
        />
        // signedIn?
        // <Header/> : <Navigate to="/login" />
        
    );
}