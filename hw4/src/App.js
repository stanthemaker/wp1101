import "./App.css";
import Item from "./components/Item";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";

const App = () => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
	const [todoList, setTodoList] = useState([]);
	const [State, setState] = useState(ALL);
	// useEffect(() => {
	// 	todoList.map((e) => {

	// 	});
	// }, [todoList]);
	const AddItem = (text) => {
		// console.log("text from AddItem", text);
		setTodoList([
			...todoList,
			{
				checked: false,
				text: text,
			},
		]);
	};
	const DeleteItem = (index) => {
		// console.log("receive index from DeleteItem", index);
		setTodoList((todoList) => todoList.filter((e, i) => i !== index));
	};
	const CheckItem = (index) => {
		console.log("receive index from CheckItem", index);
		let tmp_todoList = todoList.slice(); // make sure it's not copy by reference
		tmp_todoList[index].checked = !tmp_todoList[index].checked;
		setTodoList(tmp_todoList);
		// console.log("todoList after checked:", todoList[index].checked);
	};
	const ChangeState = (state) => {
		setState(state);
		console.log("current State :", State);
	};
	const ClearComplete = () => {
		let tmp_todoList = todoList.filter((e) => e.checked === false);
		setTodoList(tmp_todoList);
	};
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
					{todoList.map((e, index) => {
						// console.log(e);
						return (
							<Item
								{...e}
								State={State}
								DeleteItem={DeleteItem}
								CheckItem={CheckItem}
								currentIndex={index}
							/>
						);
					})}
				</ul>
			</section>
			<Footer
				State={State}
				left_count={todoList.filter((item, i) => item.checked === false).length}
				length={todoList.length}
				ChangeState={(state) => ChangeState(state)}
				ClearComplete={ClearComplete}
			/>
		</div>
	);
};

export default App;
