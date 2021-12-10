import { useEffect } from "react";
import { useStock } from "../context/useStock";

//main page
const Main = ()=>{
    const {signedIn,
        username,
        favorite,
        addUser,
        login,
        initialize} = useStock()
    console.log("This is main page!")
    useEffect(()=>{
        initialize()
    })

    return; 
}

export default Main;