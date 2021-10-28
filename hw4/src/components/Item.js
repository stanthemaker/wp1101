// import "./App.css";
import "./components.css";
import xIcon from "./x.png";
import React, { useState, useEffect } from "react";

const Item = (props) => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
	let { text, checked, State, DeleteItem, currentIndex, CheckItem } = props;
	const InputStyle = {
		textDecoration: checked ? "line-through" : "",
		opacity: checked ? 0.5 : 1,
	};
	// console.log("state in Item function ", State);
	// console.log("checked = " + checked);
	const todo = ( // type of todo is object
		<>
			<li className="todo-app__item" style={InputStyle}>
				<div className="todo-app__checkbox">
					<input
						type="checkbox"
						id={currentIndex}
						checked={checked}
						onChange={() => CheckItem(currentIndex)}
					/>
					<label htmlFor={currentIndex} />
				</div>
				<h1 className="todo-app__item-detail">{text}</h1>
				<img
					src={xIcon}
					alt="x"
					className="todo-app__item-x"
					id={"img" + currentIndex}
					onClick={() => DeleteItem(currentIndex)}
				/>
			</li>
		</>
	);
	switch (State) {
		case ALL:
			return todo;
		case ACTIVE:
			if (!checked) {
				return todo;
			}
			break;
		case COMPLETED:
			if (checked) {
				return todo;
			}
			break;
	}
	return null;
};

export default Item;
