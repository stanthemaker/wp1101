import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { guess, startGame, restart } from "./axios";

function App() {
	const [hasStarted, setHasStarted] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [number, setNumber] = useState("");
	const [status, setStatus] = useState("");
	//views:
	const startMenu = (
		<div>
			<button
				onClick={
					() => {
						startGame();
						setHasStarted(true);
						console.log("Game started");
					}
					// someFunctionToBackend; and setHasStarted
				}
			>
				start game
			</button>
		</div>
	);

	const gameMode = (
		<>
			<p>Guess a number between 1 to 100</p>
			<input // Get the value from input
				onChange={(e) => {
					const value = e.target.value; // type value = string
					setNumber(value);
				}}
			></input>
			<button // Send number to backend
				onClick={async () => {
					let newStatus = await guess(number);
					newStatus === "Equal" ? setHasWon(true) : setStatus(newStatus);
				}}
				disabled={!number}
			>
				guess!
			</button>
			<p>{status}</p>
		</>
	);
	const winningMode = (
		<>
			<p>you won! the number was {number}.</p>
			<button // Handle restart for backend and frontend
				onClick={async () => {
					setHasWon(false);
					setNumber("");
					setStatus("");
					restart();
				}}
			>
				restart
			</button>
		</>
	);

	const game = <div>{hasWon ? winningMode : gameMode} </div>;

	return <div className="App">{hasStarted ? game : startMenu}</div>;
}

export default App;
