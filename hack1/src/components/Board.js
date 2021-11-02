/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import createBoard from "../util/createBoard";
import { revealed } from "../util/reveal";
import "./css/Board.css";

const Board = ({ boardSize, mineNum, backToHome }) => {
	const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
	const [nonMineCount, setNonMineCount] = useState(0); // An integer variable to store the number of cells whose value are not '💣'.
	const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
	const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
	const [remainFlagNum, setRemainFlagNum] = useState(0); // An integer variable to store the number of remain flags.
	const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

	useEffect(() => {
		// Calling the function
		freshBoard();
	}, []);

	// Creating a board
	const freshBoard = () => {
		{
			/* -- TODO 3-1 -- */
			// let tmp_board = createBoard(boardSize, mineNum).board;
			let tmp = createBoard(10, 5);
			let tmp_board = tmp.board;
			let tmp_mineLocations = tmp.mineLocations;
			// let mineLocations = createBoard(10,5)
			setBoard(tmp_board);
			setMineLocations(tmp_mineLocations);
		}
		{
			/* Useful Hint: createBoard(...) */
		}
	};

	const restartGame = () => {
		{
			/* -- TODO 5-2 -- */
		}
		{
			/* Useful Hint: freshBoard() */
		}
	};

	// On Right Click / Flag Cell
	const updateFlag = (e, x, y) => {
		// To not have a dropdown on right click
		e.preventDefault();
		// Deep copy of a state
		let tmp_board = board.slice();
		/* -- TODO 3-2 -- */
		if (tmp_board[x][y].revealed) {
			return;
		}
		tmp_board[x][y].flagged = !tmp_board[x][y].flagged;
		setBoard(tmp_board);
		tmp_board[x][y].flagged === true
			? setRemainFlagNum(remainFlagNum + 1)
			: setRemainFlagNum(remainFlagNum - 1);
		{
			/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */
		}
		{
			/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */
		}
		{
			/* Reminder: The cell can be flagged only when it is not revealed. */
		}
	};

	const revealCell = (x, y) => {
		/* -- TODO 4-1 -- */
		let tmp_board = board.slice();

		if (win === true || gameOver === true) {
			return;
		}
		for (let i = 0; i < mineNum; i++) {
			if (x == mineLocations[i][0] && y == mineLocations[i][1]) {
				setGameOver(true);
			}
			if (gameOver === true) {
				for (let j = 0; j < boardSize; j++) {
					for (let k = 0; k < boardSize; k++) {
						if (j == mineLocations[i][0] && k == mineLocations[i][1]) {
							tmp_board[j][k].revealed = true;
						}
					}
				}
				return;
			}
		}
		tmp_board = revealed(tmp_board, x, y);
		{
			/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */
		}
		{
			/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */
		}
	};
	console.log("board = ", board);
	console.log("minelocation =", mineLocations);

	return (
		<div className="boardPage">
			<div className="boardWrapper">
				{/* <h1>This is the board Page!</h1>{" "} */}
				{/* This line of code is just for testing. Please delete it if you finish this function. */}
				{/* -- TODO 3-1 -- */}
				{/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
				{/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
				<div className="boardContainer">
					<Dashboard remainFlagNum={remainFlagNum} />
					{board.map((r, rowIdx) => (
						<div id={"row" + rowIdx} style={{ display: "flex" }}>
							{r.map((e, colIdx) => (
								<Cell
									rowIdx={rowIdx}
									colIdx={colIdx}
									detail={e}
									updateFlag={updateFlag}
									revealCell={revealCell}
								/>
							))}
						</div>
					))}
				</div>
				{/* {createBoard()} */}
			</div>
		</div>
	);
};

export default Board;
