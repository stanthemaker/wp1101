import { createContext, useContext, useState } from "react";
import axios from "../api/index";
import { message } from "antd";

const StockContext = createContext({
	signedIn: "", //感覺後端會動到的state才放到這 eg message
	password: "",
	username: "",
	initialized: "",
	modelisRunning: "",
	headline: "",
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
	checkModel: () => {},
	runModel: () => {},
	displayStatus: () => {},
	stockInfo: () => {},
	Nasdaq100List: () => {},
	verifyToken: () => {},
});

const StockProvider = (props) => {
	const [signedIn, setSignedIn] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [modelisRunning, setModelIsRunning] = useState(false);
	const [username, setUsername] = useState("");
	const [headline, setHeadline] = useState("");
	const [jwt, setJwt] = useState("");
	const [favorites, setFavorite] = useState([]);
	const [model, setModel] = useState([]);
	const [passedcompany, setPassedCompany] = useState([]);
	const displayStatus = (payload) => {
		if (payload.msg) {
			const { type, msg } = payload;
			const content = {
				content: msg,
				duration: 1,
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
			data: { message, token },
		} = await axios.get("/stockalendar/login", { params: { name, password } });
		if (message === "success") {
			setInitialized(false);
			setJwt(token);
			localStorage.setItem("token", token);
			initialize(name);
		}
		return message;
	};
	const verifyToken = async () => {
		console.log("Verifying token...");
		const savedtoken = localStorage.getItem("token");
		if (!savedtoken) {
			setInitialized(true);
			console.log("token not found, set init to true");
			return;
		}
		const {
			data: { message, user },
		} = await axios.get("/stockalendar/verifytoken", {
			headers: {
				authorization: `Bearer ${savedtoken}`,
			},
		});
		if (message === "Valid Token") {
			initialize(user.name);
		} else {
			setInitialized(true);
			return;
		}
	};
	const initialize = async (username) => {
		const {
			data: { message, favorites },
		} = await axios.get("/stockalendar/myFavorites/userFavorites", {
			params: { username },
		});
		if (message === "success") {
			let companyList = [];
			for (let i = 0; i < favorites.length; i++) {
				const { info } = await stockInfo(favorites[i]);
				companyList.push(info);
			}
			setSignedIn(true);
			setUsername(username);
			setFavorite(companyList);
			const {
				data: { message, headline },
			} = await axios.get("/stockalendar/Home/headline");
			if (message === "success") {
				setHeadline(headline);
			}
			setInitialized(true);
		}
	};
	const userFavorites = async () => {};
	const addFavorites = async (username, tag) => {
		const { mes, info } = await stockInfo(tag);
		if (mes === "success") {
			const {
				data: { message },
			} = await axios.post("/stockalendar/myFavorites/addFavorites", {
				name: username,
				tag: tag,
			});
			if (message === "success") setFavorite([...favorites, info]);
		}
		return { mes, info };
	};
	const delFavorite = async (username, tag) => {
		const {
			data: { message },
		} = await axios.post("/stockalendar/myFavorites/delFavorite", {
			name: username,
			tag: tag,
		});
		if (message === "success") {
			const newFavorites = favorites.filter(
				(favorite) => favorite.ticker !== tag
			);
			setFavorite(newFavorites);
		}
		return message;
	};
	const userModels = async () => {};
	const addModels = async (inequation) => {};
	const delModel = async (inequation) => {};
	const checkModel = async (model) => {
		const {
			data: { message },
		} = await axios.get("/stockalendar/myModels/checkModel", {
			params: { model },
		});
		return message;
	};
	const runModel = async (model, tags) => {
		setModelIsRunning(true);
		const {
			data: { message, passedCompany },
		} = await axios.get("/stockalendar/myModels/runModel", {
			params: { tags, model },
		});
		if (message === "success") {
			setPassedCompany(passedCompany);
		}
		setModelIsRunning(false);
		return message;
	};
	const stockInfo = async (tag) => {
		const {
			data: { message, info },
		} = await axios.get("/stockalendar/myFavorites/stockInfo", {
			params: { tag },
		});
		const mes = message;
		return { mes, info };
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
				initialized,
				modelisRunning,
				headline,
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
				checkModel,
				runModel,
				stockInfo,
				Nasdaq100List,
				verifyToken,
			}}
			{...props}
		/>
	);
};
function useStock() {
	return useContext(StockContext);
}

export { StockProvider, useStock };
