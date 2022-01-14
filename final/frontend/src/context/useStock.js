// import React from 'react';
import { createContext, useContext, useState } from "react";
// import axios from 'axios';
import axios from "../api/index";
import { message } from "antd";

const StockContext = createContext({
	signedIn: "", //感覺後端會動到的state才放到這 eg message
	password: "",
	username: "",
	model: [],
	favorites: [],
	passedcompany: [],
	jwt: [],
	displayStatus: () => {},
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
	displayStatus: () => {},
	stockInfo: () => {},
	Nasdaq100List: () => {},
	verifyToken: ()=> {}
});

const StockProvider = (props) => {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [favorites, setFavorite] = useState([]);
	const [model, setModel] = useState([]);
	const [passedcompany, setPassedCompany] = useState([]);
	const [jwt, setJwt] = useState('')
	const displayStatus = (payload) => {
		if (payload.msg) {
			const { type, msg } = payload;
			const content = {
				content: msg,
				duration: 0.75,
			};
			switch (type) {
				case "success":
					message.success(content);
					break;
				case "error":
					message.error(content);
					break;
				default:
					break;
			}
		}
	};
	const addUser = async (name, email, password) => {
		const {
			data: { message },
		} = await axios.post("/stockalendar/register", {
			name: name,
			email: email,
			password: password,
		});
		return message;
	};
	const login = async (name, email, password) => {
		name = name.trim();
		const {
			data: { message, favorites, models, token},
		} = await axios.get("/stockalendar/login", { params: { name, password } });
		if (message === "success") {
			setSignedIn(true);
			setUsername(name);
			setFavorite(favorites);
			setModel(models);
			setJwt(token);
			localStorage.setItem('token',token)
		}
		return message;
	};
	const verifyToken = async ()=>{
		const savedtoken = localStorage.getItem('token')
		console.log(`savedtoken${savedtoken}`)
		const {data:{message}} = await axios.get("/stockalendar/verifytoken",{
			headers: {
				authorization: `Bearer ${savedtoken}`
			}
		})
		console.log(`message${message}`)
		if(message==='Valid Token'){
			setSignedIn(true)
		}
	}
	const initialize = async () => {
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
	const addFavorites = async (username, tag) => {
		const {
			data: { message },
		} = await axios.post("/stockalendar/myFavorites/addFavorites", {
			name: username,
			tag: tag,
		});
		if (message === "success") {
			setFavorite([...favorites, tag]);
		}
		return message;
	};
	const delFavorite = async (username, tag) => {
		//delete?
		const {
			data: { message },
		} = await axios.post("/stockalendar/myFavorites/delFavorite", {
			name: username,
			tag: tag,
		});
		if (message === "success") {
			const newFavorites = favorites.filter((favorite) => favorite !== tag);
			setFavorite(newFavorites);
		}
		return message;
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
		return message;
	};
	const delModel = async (inequation) => {
		const message = await axios.post("/stockalendar/myModels/delModel", {
			username,
			inequation,
		});
		return message;
	};
	const runModel = async (model, tags) => {
		const {
			data: { message, passedCompany },
		} = await axios.get("/stockalendar/myModels/runModel", {
			params: { tags, model },
		});
		if (message === "success") {
			setPassedCompany(passedCompany);
		} else {
			displayStatus({
				type: "error",
				msg: message,
			});
		}
		return message;
	};
	const marketHeadline = async () => {
		const {
			data: { message, headline },
		} = await axios.get("/stockalendar/Home/headline");
		return { message, headline };
	};
	const stockInfo = async (tag) => {
		const {
			data: { message, info },
		} = await axios.get("/stockalendar/myFavorites/stockInfo", {
			params: { tag },
		});
		return { message, info };
	};
	const Nasdaq100List = async () => {
		const {
			data: { message, Nasdaq100List },
		} = await axios.get("/stockalendar/myModels/Nasdaq100List");

		return { message, NasdaqList: Nasdaq100List };
	};
	return (
		<StockContext.Provider
			value={{
				signedIn,
				username,
				favorites,
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
				Nasdaq100List,
				verifyToken,
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
