/* Global Variables */
const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
let todos = [];
let todoList = document.getElementById("todo-list");
let footer = document.getElementById("todo-footer");
let root = document.getElementById("root");
let clearDiv = document.getElementsByClassName("todo-app__clean")[0];
let clearButton = document.getElementById("clear_completed_button");
let state = ALL;
let lastIdx = 0;

/* Utils */
const getTodoId = (todo) => todo.firstElementChild.firstElementChild.id; //= input id
const completed = (todo) => todo.firstElementChild.firstElementChild.checked; // boolean

/* Todo Modifiers */
const toggleTodo = (id, checked) => {
	let idx = id;
	console.log("who's 13a5sd1f61?", todos[idx]);
	todos[idx].firstElementChild.firstElementChild.checked = checked;
	todos[idx].style["textDecoration"] = checked ? "line-through" : "";
	todos[idx].style["opacity"] = checked ? 0.5 : 1;
	countLeft();
	viewTodos();
};

const removeTodo = (id) => {
	// let idx = todos.findIndex((todo) => getTodoId(todo) === id);
	let idx = id;
	todos.splice(idx, 1);
	countLeft();
	viewTodos();
};

const addTodo = (todoName) => {
	let newItem = generateItem(lastIdx.toString(), todoName);
	lastIdx += 1;
	todos.push(newItem);
	viewTodos();
	countLeft();
};

/* DOM Constructors */
const generateItem = (_id, _text) => {
	let newItem = document.createElement("li");
	newItem.className = "todo-app__item";
	let checkBox = document.createElement("div");
	checkBox.className = "todo-app__checkbox";
	let inputTag = document.createElement("input");
	inputTag.type = "checkbox";
	inputTag.id = _id;
	inputTag.addEventListener("click", (event) =>
		toggleTodo(event.currentTarget.id, event.currentTarget.checked)
	);
	let labelTag = document.createElement("label");
	labelTag.htmlFor = _id;

	checkBox.appendChild(inputTag);
	checkBox.appendChild(labelTag);
	newItem.appendChild(checkBox);

	let textTag = document.createElement("h1");
	textTag.className = "todo-app__item-detail";
	textTag.innerText = _text;
	newItem.appendChild(textTag);
	let crossImg = document.createElement("img");
	crossImg.src = "img/x.png";
	crossImg.className = "todo-app__item-x";
	crossImg.id = "img" + _id;
	crossImg.addEventListener("click", () => removeTodo(_id));
	newItem.appendChild(crossImg);
	return newItem;
};

/* Render */
const countLeft = () => {
	let count = todos.filter((todo) => !completed(todo)).length;
	// todos.filter((todo) => !completed(todo)) is a list
	let container = document.getElementById("left_count");
	container.innerText = count.toString();
};

const viewTodos = () => {
	if (todos.length) {
		//if having todos
		console.log("footer = ", footer);
		console.log("footer's parent  = ", footer.parentNode);
		if (footer.parentNode !== root) {
			root.appendChild(footer);
			// console.log("in if ");
		}
	} else if (footer.parentNode === root) root.removeChild(footer); //del footer

	if (todos.some((todo) => completed(todo))) {
		if (clearButton.parentNode !== clearDiv) clearDiv.appendChild(clearButton);
	} else if (clearButton.parentNode === clearDiv)
		clearDiv.removeChild(clearButton);
	let filteredTodos;
	switch (state) {
		case ALL:
			filteredTodos = todos;
			break;
		case ACTIVE:
			filteredTodos = todos.filter((todo) => !completed(todo));
			break;
		case COMPLETED:
			filteredTodos = todos.filter((todo) => completed(todo));
			break;
		default:
			filteredTodos = [];
			break;
	}
	console.log("todoList.lastChild ==", todoList.lastChild);
	// clean all nodes
	while (todoList.lastChild) {
		console.log("node being deleted", todoList.lastChild);
		todoList.removeChild(todoList.lastChild);
	}
	for (let i = 0; i < filteredTodos.length; i++) {
		todoList.appendChild(filteredTodos[i]);
	}
};

/* Main */
const init = () => {
	console.log("this is from refer");
	let inputTag = document.getElementById("todo-input");
	inputTag.addEventListener("keyup", (event) => {
		if (event.keyCode === 13 && event.target.value !== "") {
			addTodo(event.target.value);
			inputTag.value = "";
		}
	});
	for (let filter = 0; filter < 3; filter++) {
		let viewButton = document.getElementById("view_" + filter.toString());
		viewButton.addEventListener("click", () => {
			viewButton.style.borderColor = "rgb(0,0,0)";
			let prevButton = document.getElementById("view_" + state.toString());
			prevButton.style.borderColor = "rgb(255,255,255)";
			state = filter;
			viewTodos();
		});
		if (filter === ALL) viewButton.style.borderColor = "rgb(0,0,0)";
	}
	let clearButton = document.getElementById("clear_completed_button");
	clearButton.addEventListener("click", () => {
		let newTodos = todos.filter((todo) => !completed(todo));
		todos = newTodos; //change the
		viewTodos();
	});
	clearDiv.removeChild(clearButton);
	root.removeChild(footer);
};

init();
