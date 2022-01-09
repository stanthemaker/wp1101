import React from "react";
import { Route, Redirect} from "react-router-dom";
import { useStock } from "../context/useStock";
// import Header from "../Components/HomePage";

export default function LoginRoute({path, children}){
    const {signedIn} = useStock()

    return(
        <Route exact path={path}
            render={()=>{
                return signedIn? <Redirect to="/"/>: children;
            }}
        />
        // signedIn?
        // <Navigate to="/"/> : <Navigate to="/login" />
        
    );
}