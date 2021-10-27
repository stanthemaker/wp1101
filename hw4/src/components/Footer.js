import "./components.css";
const Footer = (props) => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
	let { length, changeState } = props;
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
	if (length === 0) {
		return <></>;
	}
	return (
		<>
			<footer id="todo-footer" className="todo-app__footer">
				<div className="todo-app__total">
					<span id="left_count">0</span> left
				</div>

				<ul className="todo-app__view-buttons">
					<li>
						<button type="button" id="view_0" onClick={() => changeState(ALL)}>
							All
						</button>
					</li>
					<li>
						<button
							type="button"
							id="view_1"
							onClick={() => changeState(ACTIVE)}
						>
							Active
						</button>
					</li>
					<li>
						<button
							type="button"
							id="view_2"
							onClick={() => changeState(COMPLETED)}
						>
							Completed
						</button>
					</li>
				</ul>

				<div className="todo-app__clean">
					<button type="button" id="clear_completed_button">
						Clear completed
					</button>
				</div>
			</footer>
		</>
	);
};

export default Footer;
