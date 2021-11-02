/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) => {
	console.log("x, y  isto revealed", x, y);
	const ValueisZero = (x, y, board) => {
		board[x][y].revealed = true;
		console.log("in funtcion");
		if (x !== 0) {
			// top
			board[x - 1][y].revealed = true;
			if (board[x - 1][y].value === 0 && board[x - 1][y].revealed === false)
				ValueisZero(x - 1, y, board);

			if (y !== 0) {
				// left
				board[x][y - 1].revealed = true;
				if (board[x][y - 1].value === 0 && board[x][y - 1].revealed === false)
					ValueisZero(x, y - 1, board);
				//top left
				board[x - 1][y - 1].revealed = true;
				if (
					board[x - 1][y - 1].value === 0 &&
					board[x - 1][y - 1].revealed === false
				)
					ValueisZero(x - 1, y - 1, board);
			}
			if (y !== boardSize - 1) {
				//right
				board[x][y + 1].revealed = true;
				if (board[x][y + 1].value === 0 && board[x][y + 1].revealed === false)
					ValueisZero(x, y + 1, board);
				//top right
				board[x - 1][y - 1].revealed = true;
				if (
					board[x - 1][y - 1].value === 0 &&
					board[x - 1][y - 1].revealed === false
				)
					ValueisZero(x - 1, y - 1, board);
			}
		}
		if (x !== boardSize - 1) {
			// bottom
			board[x + 1][y].revealed = true;
			if (board[x + 1][y].value === 0 && board[x + 1][y].revealed === false)
				ValueisZero(x + 1, y, board);
			if (y !== 0) {
				//buttom left
				board[x + 1][y - 1].revealed = true;
				if (
					board[x + 1][y - 1].value === 0 &&
					board[x + 1][y - 1].revealed === false
				)
					ValueisZero(x + 1, y - 1, board);
			}
			if (y !== boardSize - 1) {
				//buttom right
				board[x + 1][y + 1].revealed = true;
				if (
					board[x + 1][y + 1].value === 0 &&
					board[x + 1][y + 1].revealed === false
				)
					ValueisZero(x + 1, y + 1, board);
			}
		}
	};

	if (board[x][y].revealed === true || board[x][y].flagged === true) {
		/* Useful Hint: If the value of the cell is not 0, only show the cell value. */
		return { board, newNonMinesCount };
	}
	if (board[x][y].value !== 0) {
		board[x][y].revealed = true;
	}
	if (board[x][y].value === 0) ValueisZero(x, y, board);

	{
		/* -- TODO 4-2 -- */
	}
	{
		/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */
	}
	{
		/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */
	}

	return { board, newNonMinesCount };
};
