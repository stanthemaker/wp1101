import React from "react";
import { Navigate } from "react-router-dom";
import { useStock } from "../context/useStock";
import Header from "../Components/HomePage";

export default function MainRoute(){
    const {signedIn} = useStock()

    return(
        signedIn?
        <Header/> : <Navigate to="/login" />
        
    );
}