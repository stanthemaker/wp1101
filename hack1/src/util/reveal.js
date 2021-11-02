/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
	{
		/* -- TODO 4-2 -- */
	}
	{
		/* Useful Hint: If the cell is already revealed, do nothing. */
	}
	if (board[x][y].revealed === true || board[x][y].flagged === true) {
		/* Useful Hint: If the value of the cell is not 0, only show the cell value. */
		return { board, newNonMinesCount };
	}
	if (board[x][y].value !== 0) {
		board[x][y].revealed = true;
		console.log("x, y  is revealed", x, y);
	}

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
