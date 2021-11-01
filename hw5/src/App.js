import "./App.css";
import React, { useState, useEffect } from "react";
import {
	InputBox,
	Row1,
	Row2,
	Row3,
	Row4,
	Row5,
	Row6,
} from "./components/Rows";
import { calculate } from "./math";

function App() {
	const [input, setInput] = useState("");
	// console.log("type input", typeof input);
	const AddtoInput = (char) => {
		console.log("Adding char :", char);
		setInput(input + char);
	};
	const DelInput = () => {
		setInput(input.slice(0, -1));
	};
	const ClearAllInput = () => {
		setInput("");
	};
	const handleKepBoardInput = (char) => {
		const validInput = [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"(",
			")",
			"+",
			"-",
			"*",
			"/",
			".",
			"Backspace",
			"Enter",
			"Escape",
		];
		if (!validInput.includes(char)) {
			// alert("Invalid input");
			return;
		}
		switch (char) {
			case "Backspace":
				DelInput();
				break;
			case "Enter":
				handleMath();
				break;
			case "Escape":
				ClearAllInput();
				break;
			default:
				setInput(input + char);
				break;
		}
	};
	const handleMath = () => {
		let ans = calculate(input);
		console.log("ans", ans);
		setInput(ans);
	};
	console.log("current input = ", input);
	return (
		<table className="calculator" cellSpacing="0" cellPadding="1">
			<tbody>
				<InputBox
					AddtoInput={AddtoInput}
					input={input}
					handleKepBoardInput={handleKepBoardInput}
					handleMath={handleMath}
				/>
				<Row1
					AddtoInput={AddtoInput}
					DelInput={DelInput}
					ClearAllInput={ClearAllInput}
				/>
				<Row2 AddtoInput={AddtoInput} />
				<Row3 AddtoInput={AddtoInput} />
				<Row4 AddtoInput={AddtoInput} />
				<Row5 AddtoInput={AddtoInput} />
				<Row6 AddtoInput={AddtoInput} />
			</tbody>
		</table>
	);
}

export default App;
