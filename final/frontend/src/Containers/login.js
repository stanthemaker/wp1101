//login page
import { useState } from "react";
import { useStock } from "../context/useStock";

const Login = ()=>{
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const { login } = useStock()
    console.log("this is login page")
    return;
}

export default Login;