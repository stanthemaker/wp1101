let todoList = [];
let todoLength = 0;
let root_div = document.getElementById("root");
let todo_list_ul = document.getElementById("todo-list");
let footer = document.getElementById("todo-footer");
let left_count = document.getElementById("left_count");
let AllButton = document.getElementById("view_0");
let ActiveButton = document.getElementById("view_1");
let CompletedButton = document.getElementById("view_2");
const todo_input = document.getElementById("todo-input");
const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
let State = ALL;
const checkItem = (_id) => {
	console.log("check id = ", _id);
	let checkbox = todoList[_id].firstElementChild.firstElementChild;
	console.log("before toggle", checkbox.checked);
	checkbox.checked = !checkbox.checked;
	todoList[_id].checked = !todoList[_id].checked;
	let isChecked = checkbox.checked;
	let label = todoList[_id].firstElementChild.lastChild;
	console.log("Checkbox is selected", isChecked);

	todoList[_id].style["textDecoration"] = isChecked ? "line-through" : "";
	todoList[_id].style["opacity"] = isChecked ? 0.5 : 1;

	// label.style.background = isChecked ? "#26ca299b" : "rgba(99, 99, 99, 0.698)";
	refresh();
};
const deleteItem = (_id) => {
	todoList.splice(_id, 1);
	//mapping all item
	mapping();
	refresh();
};
const AppendItem = (todo_text) => {
	let newitem = generateToDo(todoList.length, todo_text);
	todoList.push(newitem);
	// todoLength += 1;
	refresh();
};
const generateToDo = (id, todo_text) => {
	let liTag = document.createElement("li");
	liTag.className = "todo-app__item"; //testing
	let div_node = document.createElement("div"); //add eventlistener
	// div_node

	div_node.className = "todo-app__checkbox";
	let inputNode = document.createElement("input");
	inputNode.type = "checkbox";
	inputNode.id = id;

	let labelNode = document.createElement("label");
	labelNode.htmlFor = id;
	labelNode.setAttribute("onclick", `checkItem(${id})`);

	div_node.appendChild(inputNode);
	div_node.appendChild(labelNode);

	let h1Tag = document.createElement("h1");
	h1Tag.innerText = todo_text;
	h1Tag.className = "todo-app__item-detail";
	let imgTag = document.createElement("img");
	imgTag.src = "img/x.png";
	imgTag.className = "todo-app__item-x";
	imgTag.id = `img${id}`;
	imgTag.setAttribute("onclick", `deleteItem(${id})`);
	liTag.appendChild(div_node);
	liTag.appendChild(h1Tag);
	liTag.appendChild(imgTag);
	return liTag;
};
const mapping = () => {
	for (let i = 0; i < todoList.length; i++) {
		todoList[i].firstElementChild.firstElementChild.id = i;
		todoList[i].firstElementChild.lastChild.htmlFor = i;
		todoList[i].lastChild.setAttribute("onclick", `deleteItem(${i})`);
		todoList[i].firstElementChild.lastChild.setAttribute(
			"onclick",
			`checkItem(${i})`
		);
	}
};
const refresh = () => {
	// clear all
	while (todo_list_ul.lastChild) {
		todo_list_ul.removeChild(todo_list_ul.lastChild);
	}
	// console.log("root children", root_div.children.length)
	if (root_div.children.length === 3) {
		root_div.removeChild(footer);
	}
	//
	let todoList_show = [];
	switch (State) {
		case ALL:
			todoList_show = todoList;
			break;
		case COMPLETED:
			todoList_show = todoList.filter((todoItem) => todoItem.checked);
			break;
		case ACTIVE:
			todoList_show = todoList.filter((todoItem) => !todoItem.checked);
			break;
	}

	// appending new
	for (let i = 0; i < todoList_show.length; i++) {
		todo_list_ul.appendChild(todoList_show[i]);
	}
	//handling footer
	if (todoList_show.length > 0 || State !== ALL) {
		root_div.appendChild(footer);
	}
	//handle counting
	left_count.textContent = `${count()}`;
};
const count = () => {
	return todoList.filter((todoItem) => !todoItem.checked).length;
};
const init = () => {
	todo_input.addEventListener("keyup", (event) => {
		if (event.keyCode === 13 && event.target.value !== "") {
			// keycode == 13 is enter
			AppendItem(event.target.value);
			todo_input.value = "";
		}
	});
	AllButton.addEventListener("click", (event) => {
		State = ALL;
		// console.log("!!!!!!!!!!");
		refresh();
	});
	ActiveButton.addEventListener("click", (event) => {
		State = ACTIVE;
		refresh();
	});
	CompletedButton.addEventListener("click", (event) => {
		State = COMPLETED;
		refresh();
	});
	refresh();
};
init();
// console.log("root children", root_div.children);
