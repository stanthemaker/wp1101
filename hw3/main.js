let todoList = [];
let root_div = document.getElementById("root");
let todo_list_ul = document.getElementById("todo-list");
let footer = document.getElementById("todo-footer");
let left_count = document.getElementById("left_count")
const todo_input = document.getElementById("todo-input");
const checkItem = (_id) =>{
	let inputtag = todoList[_id].firstChild.firstChild;
	inputtag.checked = !inputtag.checked;
	todoList[_id].checked = !todoList[_id].checked;
	let isChecked  = inputtag.checked;

	//todoList[_id] is li tag
	todoList[_id].style["textDecoration"] = isChecked ? "line-through" : ""; 
	todoList[_id].style["opacity"] = isChecked ? 0.5 : 1;
	refresh();
}
const generateToDo = (id, todo_text) => {
	let liTag = document.createElement("li");
	liTag.className = "todo-app__item"; //testing
	let div_node = document.createElement("div"); //add eventlistener
	// div_node
	div_node.addEventListener("click" , (event) => {
		event.preventDefault(); //essential
		//current target is divnode
		let _id = event.currentTarget.firstChild.id;
		checkItem(_id);
	})
	div_node.className = "todo-app__checkbox";
	let inputNode = document.createElement("input");
	inputNode.type = "checkbox";
	inputNode.id = id;
	let labelNode = document.createElement("label");
	labelNode.htmlFor = id;
	div_node.appendChild(inputNode);
	div_node.appendChild(labelNode);

	let h1Tag = document.createElement("h1");
	h1Tag.innerText = todo_text;
	h1Tag.className = "todo-app__item-detail";
	let imgTag = document.createElement("img");
	imgTag.src = "img/x.png";
	imgTag.className = "todo-app__item-x";
	imgTag.id = `img${id}`;
	imgTag.addEventListener("click", (event) =>{
		console.log("this is", this); // what is this?
		todoList.splice(this.id, 1);
		refresh();
	})

	liTag.appendChild(div_node);
	liTag.appendChild(h1Tag);
	liTag.appendChild(imgTag);
	return liTag;
};
const todoListAppend = (todo_text) => {
	let newitem = generateToDo(todoList.length, todo_text);
	todoList.push(newitem);
	refresh();
};

const refresh = () => {
	// clear all
	while (todo_list_ul.lastChild) {
		todo_list_ul.removeChild(todo_list_ul.lastChild);
	}
	// console.log("root children", root_div.children.length)
	if (root_div.children.length === 3){
		root_div.removeChild(footer);
	}
	// appending new
	for (let i = 0; i < todoList.length; i++)
		[todo_list_ul.appendChild(todoList[i])];

	//handling footer
	if (todoList.length> 0){
		root_div.appendChild(footer);
	}
	
	//handle counting 
	left_count.textContent = `${count()}`;
	
	// left_count.value = count();
};
const count = () =>{
	// console.log("filter = ", todoList.filter(todoItem => !todoItem.checked));
	return todoList.filter(todoItem => !todoItem.checked).length;

}
const init = () => {
	todo_input.addEventListener("keyup", (event) => {
		if (event.keyCode === 13 && event.target.value !== "") {
			// keycode == 13 is enter

			todoListAppend(event.target.value);
			todo_input.value = "";
		}
	});
	refresh()
};
init();
// console.log("root children", root_div.children);
