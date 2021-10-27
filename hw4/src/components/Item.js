// import "./App.css";
import "./components.css";

const Item = (props) => {
	let { checked, id, text, State } = props;
	// console.log("Id from Item", id);
	// console.log("checked from Item", checked);
	//<li class="todo-app__item">
	//     <div class="todo-app__checkbox" eventlistner>
	//         <input type="checkbox" id="0">
	// 		<lable>
	//     </div>
	//     <h1 class="todo-app__item-detail">Testing text</h1>
	//     <img src="img/x.png" class="todo-app__item-x" id="img0">
	// </li>
	return (
		<>
			<li className="todo-app__item">
				<div className="todo-app__checkbox">
					<input type="checkbox" id={id}></input>
					<lable htmlFor={id}></lable>
				</div>
				<h1 className="todo-app__item-detail">{text}</h1>
				<img src="./x.png" alt="x" className="todo-app__item-x" id="img0"></img>
			</li>
		</>
	);
};

export default Item;
