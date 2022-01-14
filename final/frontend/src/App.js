import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect, useHistory } from "react-router";

import "./App.css";
import ButtonAppBar from "./Components/AppBar";
import SignInSide from "./Components/LogIn";
import Header from "./Components/HomePage";
import { useStock } from "./context/useStock";
import MainRoute from "./routes/mainRoute";
import LoginRoute from "./routes/loginRoute";
import Album from "./Components/Myfavorite";
import SignUp from "./Components/Register";
import Model from "./Components/Model";
import Loading from "./Components/Loading";
const Routes = () => {
	const { SignedIn, initialized, verifyToken } = useStock();
	const history = useHistory();
	useEffect(() => {
		const fetchData = async () => {
			await verifyToken();
			SignedIn ? history.push("/") : history.push("/login");
		};
		fetchData();
	}, [SignedIn]);

	return !initialized ? (
		<Loading />
	) : (
		<Switch>
			<MainRoute exact path="/">
				<Header />
			</MainRoute>
			<LoginRoute exact path="/login">
				<SignInSide />
			</LoginRoute>
			<MainRoute exact path="/myfavorite">
				<Album />
			</MainRoute>
			<MainRoute exact path="/model">
				<Model />
			</MainRoute>
			<LoginRoute exact path="/signup">
				<SignUp />
			</LoginRoute>
			<Redirect to="/login" />
		</Switch>
	);
};

export default function App() {
	return (
		<div>
			<Router>
				<ButtonAppBar>
					<Routes />
				</ButtonAppBar>
			</Router>
		</div>
	);
}
