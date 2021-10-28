import "./components.css";
const Footer = (props) => {
	const [ALL, ACTIVE, COMPLETED] = [0, 1, 2];
	let { left_count, length, ChangeState, ClearComplete, State } = props;
	// console.log("Id from Item", id);
	// console.log("checked from Item", checked);
	if (length === 0) {
		// console.log("in footer function");
		return <></>;
	}
	return (
		<>
			<footer id="todo-footer" className="todo-app__footer">
				<div className="todo-app__total">
					<span id="left_count">{left_count}</span> left
				</div>

				<ul className="todo-app__view-buttons">
					<li>
						<button
							style={{ border: State === ALL ? "0.1vw solid black" : "" }}
							type="button"
							id="view_0"
							onClick={() => ChangeState(ALL)}
						>
							All
						</button>
					</li>
					<li>
						<button
							style={{ border: State === ACTIVE ? "0.1vw solid black" : "" }}
							type="button"
							id="view_1"
							onClick={() => ChangeState(ACTIVE)}
						>
							Active
						</button>
					</li>
					<li>
						<button
							style={{ border: State === COMPLETED ? "0.1vw solid black" : "" }}
							type="button"
							id="view_2"
							onClick={() => ChangeState(COMPLETED)}
						>
							Completed
						</button>
					</li>
				</ul>

				<div className="todo-app__clean">
					<button
						type="button"
						id="clear_completed_button"
						onClick={() => ClearComplete()}
					>
						Clear completed
					</button>
				</div>
			</footer>
		</>
	);
};

export default Footer;
