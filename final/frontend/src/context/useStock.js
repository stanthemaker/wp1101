// import React from 'react';
import { createContext, useContext, useState} from 'react';
// import axios from 'axios';
import axios from '../api/index'

const StockContext = createContext({
    signedIn: "", //感覺後端會動到的state才放到這 eg message
    name:"",
    password:"",
    username:"",
    function: [],
    favorite: [],
    // user: {//or userName
    //     name: "",
    //     company: [{
    //         name: "",
    //         price: "",
    //         graph: "",
    //         performance: "",
    //     }],
    //     function: [],
    //     passedCompany: [],
    // },

    addUser: ()=>{}, //register
    login: ()=>{},
    initialize: ()=>{}, //after login
    addFavoriteCompany: ()=> {},
    addFunction: ()=>{},
})

const StockProvider = (props)=>{
    const [signedIn, setSignedIn] = useState(false);
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
    //const [user, setUser]= useState({});
    const [username, setUsername] = useState("");
    const [favorite, setFavorite] = useState([])

    const addUser = async (name, password) => { //button
        const {data: {message}} = await axios.post('/stockalendar/register', {params:{
            name,
            password,
        }})
        console.log(message);
        if (message==="register success") { 
            //setSignedIn(true); //wrong
            // setName("");
            // setPassword("");
            //react router putHistory
        } else if (message==="username already used") {
            console.log("Please choose another username");
            // setName("");
            // setPassword("")
        }
    }
    const login = async (name, password)=>{
        const {data: {message}} = await axios.get('/stockalendar/login', {params:{ name, password}})
        console.log(message)
        if (message ==="login success"){ 
            setSignedIn(true);
            setUsername(name);
            // setName("")
            // setPassword("")
            //react router putHistory!! redirect to main page
        } else if (message ==="wrong password" ) {
            console.log("wrong password");
            // setPassword("")
            //material ui snackbar alert顯示登入錯誤
        } else if (message ==="unregistered") {
            console.log("user not found please register")
            // setName("")
            // setPassword("")
        }
    }
    const initialize = async()=>{
        //useEffect?
        const {data:{message,favorites}} = await axios.get('/stockalendar/userFavorites', {params:{username}});
        if(message==="success"){
            setFavorite(favorites);
        }
    }
    const addFavoriteCompany = async (array)=>{
        const message=await axios.post('/stockalendar/addFavorite', {params:{ username , array}})
        if(message==="success"){
            console.log("add success");
        }
    }
    const addFunction = async ()=>{

    }

    return (
        <StockContext.Provider
          value={{
            signedIn,
            username,
            favorite,
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