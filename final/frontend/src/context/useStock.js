// import React from 'react';
import { createContext, useContext, useState } from "react";
// import axios from 'axios';
import axios from "../api/index";
import { message } from "antd";
const StockContext = createContext({
	signedIn: "", //感覺後端會動到的state才放到這 eg message
	name: "",
	password: "",
	username: "",
	model: [],
	favorite: [],
	passedcompany: [],
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

	addUser: () => {}, //register
	login: () => {},
	initialize: () => {}, //after login
	userFavorites: () => {},
	addFavorites: () => {},
	delFavorite: () => {},
	userModels: () => {},
	addModels: () => {},
	delModel: () => {},
	runModel: () => {},
	marketHeadline: () => {},
	displayStatus: ()=>{},
	stockInfo: () => {},
});

const StockProvider = (props) => {
	const [signedIn, setSignedIn] = useState(false);
	// const [name, setName] = useState("");
	// const [password, setPassword] = useState("");
	//const [user, setUser]= useState({});
	const [username, setUsername] = useState("");
	const [favorite, setFavorite] = useState([]);
	const [model, setModel] = useState([]);
	const [passedcompany, setPassedCompany] = useState([]);
	const displayStatus = (payload) => {
		console.log(payload);
		if (payload.msg) {
			const { type, msg } = payload;
			const content = {
				content: msg,
				duration: 0.5,
			};
			switch (type) {
				case "success":
					message.success(content);
					break;
				case "error":
				default:
					message.error(content);
					break;
			}
		}
	};
	const addUser = async (name, email, password) => {
		//button
		const {
			data: { message },
		} = await axios.post("/stockalendar/register", {
			name: name,
			email: email,
			password: password,
		});
		console.log(message);
		if (message === "register success") {
			setUsername(name);
			//setSignedIn(true); //wrong
			// setName("");
			// setPassword("");
			//react router putHistory
		} else if (message === "username already used") {
			console.log("Please choose another username");
			return message;
			// setName("");
			// setPassword("")
		}
	};
	const login = async (name, email, password) => {
		if (name === "" || email === "" || password === "") {
			console.log("mssing some input");
			return;
		}
		name = name.trim();
		const {
			data: { message, favorites, models },
		} = await axios.get("/stockalendar/login", { params: { name, password } });
		// console.log(message)
		// const {message, favorites, models} = {message:"",favorites:[],models:[]}
		if (message === "login success") {
			setSignedIn(true);
			setUsername(name);
			setFavorite(favorites);
			setModel(models);

			//return message
			// setName("")
			// setPassword("")
			//react router putHistory!! redirect to main page
		} else if (message === "wrong password") {
			console.log("wrong password");
			// setPassword("")
			//material ui snackbar alert顯示登入錯誤
		} else if (message === "unregistered") {
			console.log("user not found please register");
			// setName("")
			// setPassword("")
		}
		return message;
	};
	const initialize = async () => {
		//useEffect?
		const {
			data: { message, favorites },
		} = await axios.get("/stockalendar/userFavorites", {
			params: { username },
		});
		if (message === "success") {
			setFavorite(favorites);
		}
	};
	const userFavorites = async () => {
		const {
			data: { message, favorites },
		} = await axios.get("stockalendar/myFavorites/userFavorites", {
			params: { username },
		});

		if (message === "success" && favorites) {
			return favorites;
		} else {
			throw new Error("userFavorites fetch fail");
		}
	};
	const addFavorites = async (array) => {
		const message = await axios.post(
			"/stockalendar/addFavorites/addFavorites",
			{
				params: { username, array },
			}
		);
		if (message === "success") {
			console.log("add success");
		}
	};
	const delFavorite = async (tag) => {
		//delete?
		const message = await axios.post("/stockalendar/myFavorites/delFavorite", {
			username,
			tag,
		});
		if (message === "success") {
			return message;
		} else throw new Error("delete favorite fail");
	};
	const userModels = async () => {
		const {
			data: { message, models },
		} = await axios.get("/stockalendar/myModels/userModels", {
			params: { username },
		});
		if (message === "success") {
			return models;
		} else {
			//throw new Error("userModels fetch fail")
			console.log("userModels fetch fail.");
		}
	};
	const addModels = async (inequation) => {
		const message = await axios.post("/stockalendar/myModels/addModel", {
			username,
			inequation,
		});
		if (message === "success") {
			console.log("add model success");
			return message; //notsure
		}
	};
	const delModel = async (inequation) => {
		const message = await axios.post("/stockalendar/myModels/delModel", {
			username,
			inequation,
		});
		if (message === "success") {
			return message;
		} else {
			console.log("delete model fail.");
			return "delete model fail.";
		}
	};
	const runModel = async (model, tags) => {
		const {
			data: { message, passedCompany },
		} = await axios.get("/stockalendar/myModels/runModel", {
			params: { tags, model },
		});
		if (message === "success") {
			setPassedCompany(passedCompany);
			console.log("passed company:", passedCompany);
			return message;
		} else {
			console.log("Model test fail.");
			return message;
		}
	};
	const marketHeadline = async () => {
		const {
			data: { message, headline },
		} = await axios.get("/stockalendar/Home/headline");
		if (message === "success" && headline) {
			return headline;
		} else {
			throw new Error("headline fetch fail.");
		}
	};
	const stockInfo = async (tags) => {
		const {
			data: { message, companies },
		} = await axios.get("/stockalendar/myFavorites/stockInfo", {
			params: { tags },
		});
		if (message === "success" && companies) {
			return companies;
		} else {
			throw new Error("stockInformation fetch fail.");
		}
	};
	return (
		<StockContext.Provider
			value={{
				signedIn,
				username,
				favorite,
				model,
				passedcompany,
				displayStatus,
				addUser,
				login,
				initialize,
				userFavorites,
				addFavorites,
				delFavorite,
				userModels,
				addModels,
				delModel,
				runModel,
				marketHeadline,
				stockInfo,
			}}
			{...props}
		/>
	);
};
function useStock() {
	// console.log("THIS IS general useContext")
	return useContext(StockContext);
}

export { StockProvider, useStock };
