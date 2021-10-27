import "./App.css";
import React, { useState, useEffect } from "react";
import Item from "./components/Item";

// let todoList = [{ id: 0, checked: false }];
// todoList.push({ id: 1, checked: true})
// todoList.splice(index)
const App = () => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];

	const [todoList, setTodoList] = useState([]);
	const [State, setState] = useState(() => {
		return ALL;
	});
	// setTodoList([1]);
	const AddItem = (text) => {
		console.log("text from AddItem", text);
		setTodoList([
			...todoList,
			{
				id: todoList.length,
				checked: false,
				text: text,
			},
		]);
	};
	console.log("todoList:", todoList);
	// console.log("todoList is array?:", todoList.isArray());

	return (
		<div className="todo-app__root">
			<header className="todo-app__header todo-app__title">todos</header>

			<section className="todo-app__main">
				<input
					className="todo-app__input"
					id="todo-input"
					placeholder="What needs to be done?"
					onKeyPress={(e) => {
						if (e.key === "Enter" && e.target.value !== "") {
							AddItem(e.target.value);
							e.target.value = "";
						}
					}}
				/>
				<ul className="todo-app__list" id="todo-list">
					{todoList.map((e) => (
						<Item {...e} State />
					))}
				</ul>
			</section>
		</div>
	);
};

export default App;
