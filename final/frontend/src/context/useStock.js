// import React from 'react';
import { createContext, useContext, useState} from 'react';
// import axios from 'axios';
import axios from '../api/index'

const StockContext = createContext({
    signedIn: "", //感覺後端會動到的state才放到這 eg message
    name:"",
    password:"",
    user: {//or userName
        name: "",
        company: [{
            name: "",
            price: "",
            graph: "",
            performance: "",
        }],
        function: [],
        passedCompany: [],
    },

    addUser: ()=>{}, //register
    login: ()=>{},
    initialize: ()=>{}, //after login
    addFavoriteCompany: ()=> {},
    addFunction: ()=>{},
})

const StockProvider = (props)=>{
    const [signedIn, setSignedIn] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser]= useState({});

    const addUser = async () => { //button
        const {data: {message}} = await axios.post('/stockcalender/register', {
            name,
            password,
        })
        console.log(message);
        if (!message) { 
            setSignedIn(true);
            setName("");
            setPassword("");
        }
    }
    const login = async ()=>{
        const {data: {message}} = await axios.get('/stockcalender/login', { name, password})
        console.log(message)
        if (message ==="login success"){ 
            setSignedIn(true);
            //react router putHistory!! redirect to main page
        } else if (message ==="wrong password" || message==="unregistered") {
            console.log("login fail");
            //material ui snackbar alert顯示登入錯誤
        }
    }
    const initialize = ()=>{
        //useEffect?
    }
    const addFavoriteCompany = ()=>{

    }
    const addFunction = ()=>{

    }

    return (
        <StockContext.Provider
          value={{
            user,
            addUser,
            login,
            initialize,
            addFavoriteCompany,
            addFunction,
          }}
          {...props}
        />
    )
}
function useStock (){
    // console.log("THIS IS general useContext")
return useContext(StockContext);
}

export { StockProvider, useStock };