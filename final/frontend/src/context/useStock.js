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
	favorites: [],
	passedcompany: [],
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
});

const StockProvider = (props) => {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [favorites, setFavorite] = useState([]);
	const [model, setModel] = useState([]);
	const [passedcompany, setPassedCompany] = useState([]);
	const displayStatus = (payload) => {
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
			data: { message, favorites, models },
		} = await axios.get("/stockalendar/login", { params: { name, password } });
		if (message === "success") {
			setSignedIn(true);
			setUsername(name);
			setFavorite(favorites);
			setModel(models);
		}
		return message;
	};
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
	const addFavorites = async (array) => {
		const message = await axios.post(
			"/stockalendar/addFavorites/addFavorites",
			{
				params: { username, array },
			}
		);
		return message;
	};
	const delFavorite = async (tag) => {
		//delete?
		const message = await axios.post("/stockalendar/myFavorites/delFavorite", {
			username,
			tag,
		});
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
		}
		return message;
	};
	const marketHeadline = async () => {
		const {
			data: { message, headline },
		} = await axios.get("/stockalendar/Home/headline");
		return { message, headline };
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
