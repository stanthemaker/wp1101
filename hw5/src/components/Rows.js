import "./components styles.css";
import React, { useState, useEffect } from "react";
const InputBox = (props) => {
	const { AddtoInput, input, handleKepBoardInput, handleMath } = props;
	return (
		<tr>
			<td colSpan="5">
				<input
					id="display"
					name="display"
					size="28"
					maxLength="25"
					onKeyDown={(e) => {
						console.log("e.key = ", e.key); //type = string
						handleKepBoardInput(e.key);
					}}
					value={input}
				/>
			</td>
		</tr>
	);
};
const Row1 = (props) => {
	const { AddtoInput, DelInput, ClearAllInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnTop"
					name="btnTop"
					value="C"
					onClick={() => ClearAllInput()}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnTop"
					name="btnTop"
					value="Del"
					onClick={() => DelInput()}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnTop"
					name="btnTop"
					value="="
					// onclick="if(checkNum(this.form.display.value)) { compute(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnOpps"
					name="btnOpps"
					value="&#960;"
					// onclick="addChar(this.form.display,'3.14159265359')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="%"
					// onclick=" percent(this.form.display)"
				/>
			</td>
		</tr>
	);
};
const Row2 = (props) => {
	const { AddtoInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="7"
					onClick={(e) => AddtoInput(e.target.value)}
					// onclick="addChar(this.form.display, '7')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="8"
					onClick={(e) => AddtoInput(e.target.value)}
					// onclick="addChar(this.form.display, '8')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="9"
					onClick={(e) => AddtoInput(e.target.value)}
					// onclick="addChar(this.form.display, '9')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnOpps"
					name="btnOpps"
					value="x&#94;"
					// onclick="if(checkNum(this.form.display.value)) { exp(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="/"
					// onclick="addChar(this.form.display, '/')"
				/>
			</td>
		</tr>
	);
};
const Row3 = (props) => {
	const { AddtoInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="4"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="5"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="6"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnOpps"
					name="btnOpps"
					value="ln"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="*"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
		</tr>
	);
};
const Row4 = (props) => {
	const { AddtoInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="1"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="2"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="3"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnOpps"
					name="btnOpps"
					value="&radic;"
					// onclick="if(checkNum(this.form.display.value)) { sqrt(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="-"
					// onclick="addChar(this.form.display, '-')"
				/>
			</td>
		</tr>
	);
};
const Row5 = (props) => {
	const { AddtoInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="&#177;"
					// onclick="changeSign(this.form.display)"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnNum"
					name="btnNum"
					value="0"
					onClick={(e) => AddtoInput(e.target.value)}
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="&#46;"
					// onclick="addChar(this.form.display, '&#46;')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnOpps"
					name="btnOpps"
					value="x&#50;"
					// onclick="if(checkNum(this.form.display.value)) { square(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="+"
					// onclick="addChar(this.form.display, '+')"
				/>
			</td>
		</tr>
	);
};
const Row6 = (props) => {
	const { AddtoInput } = props;
	return (
		<tr>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="("
					// onclick="addChar(this.form.display, '(')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value=")"
					// onclick="addChar(this.form.display,')')"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="cos"
					// onclick="if(checkNum(this.form.display.value)) { cos(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="sin"
					// onclick="if(checkNum(this.form.display.value)) { sin(this.form) }"
				/>
			</td>
			<td>
				<input
					type="button"
					className="btnMath"
					name="btnMath"
					value="tan"
					// onclick="if(checkNum(this.form.display.value)) { tan(this.form) }"
				/>
			</td>
		</tr>
	);
};
export { InputBox, Row1, Row2, Row3, Row4, Row5, Row6 };
