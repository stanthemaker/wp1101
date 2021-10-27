import "./App.css";
import React, { useState, useEffect } from "react";
import Item from "./components/Item";
import Footer from "./components/Footer";

// let todoList = [{ id: 0, checked: false }];
// todoList.push({ id: 1, checked: true})
// todoList.splice(index)
const App = () => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
	const [todoList, setTodoList] = useState([]);
	const [State, setState] = useState(ALL);

	const AddItem = (text) => {
		// console.log("text from AddItem", text);
		setTodoList([
			...todoList,
			{
				id: todoList.length,
				checked: false,
				text: text,
			},
		]);
	};
	const DeleteItem = (index) => {
		console.log("receive index from DeleteItem", index);
		setTodoList((todoList) => todoList.filter((todoItem, i) => i !== index));
		// setTodoList((todoList) => todoList.splice);
		// todoList.map((e) => {

		// });
		console.log("todoList after delete", todoList);
	};
	const changeState = (state) => {
		setState(state);
		console.log("current State :", State);
	};
	// console.log("todoList:", todoList);
	// console.log("todoList is array?:", todoList.isArray());
	// setImg(currentImg => currentImg.filter((img, i) => i !== index));
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
					{todoList.map((e, index) => (
						<Item
							{...e}
							State
							DeleteItem={(ind) => DeleteItem(ind)}
							currentIndex={index}
						/>
					))}
				</ul>
			</section>
			<Footer
				length={todoList.length}
				changeState={(state) => changeState(state)}
			/>
		</div>
	);
};

export default App;
