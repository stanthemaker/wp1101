import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
	uri: "http://localhost:5000/",
});
const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/`,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
