// import "./App.css";
import "./components.css";
import xIcon from "./x.png";

const Item = (props) => {
	let { checked, id, text, State, DeleteItem, currentIndex } = props;
	// console.log("Id from Item", id);
	// console.log("checked from Item", checked);

	return (
		<>
			<li className="todo-app__item">
				<div className="todo-app__checkbox">
					<input type="checkbox" id={id} />
					<label htmlFor={id} />
				</div>
				<h1 className="todo-app__item-detail">{text}</h1>
				<img
					src={xIcon}
					alt="x"
					className="todo-app__item-x"
					id={"img" + id}
					onClick={() => DeleteItem(currentIndex)}
				/>
			</li>
		</>
	);
};

export default Item;
