import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { useStock } from "../../context/useStock";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

const SmallCaption_up = styled.section`
	font-size: 1em;
	font-family: "Times New Roman";
	color: black;
	opacity: 0.8;
`;
const Space = styled.section`
	width: 300px;
	height: 50px;
`;

const example =
	"The input model will filter the input tickers.Press Enter after typing";

export default function InputForm() {
	const [funct, setFunct] = useState("");
	const [company, setCompany] = useState([]);
	const { Nasdaq100List, runModel, displayStatus, checkModel } = useStock();
	const [canImport, setCanImport] = useState(true);

	const addFunct = async (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const newModel = e.target.value;
			if (!newModel) {
				displayStatus({
					type: "error",
					msg: "Missing an inequation.",
				});
				return;
			} //todo: check validity of inequation
			if (!newModel.includes("<") && !newModel.includes(">")) {
				displayStatus({
					type: "error",
					msg: "Expected an inequation",
				});
				return;
			}
			const message = await checkModel(newModel);
			if (message === "valid") {
				setFunct(newModel);
				displayStatus({
					type: "success",
					msg: "Model valid!",
				});
				return;
			} else {
				displayStatus({
					type: "error",
					msg: "Please enter valid variables with valid inequation",
				});
			}
		}
	};
	const addCompany = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (!e.target.value) {
				displayStatus({
					type: "error",
					msg: "Missing ticker.",
				});
				return;
			}
			setCompany([...company, e.target.value]);
			e.target.value = "";
		}
	};
	const handleModelSubmit = async () => {
		if (!company.length || funct == "") {
			displayStatus({
				type: "error",
				msg: "Please make sure you have pressed Enter for both input forms.",
			});
			return;
		}
		const message = await runModel(funct, company);
		if (message !== "success") {
			displayStatus({
				type: "error",
				msg: message,
			});
			return;
		}
		//initialize modelPage
		setCompany([]);
		setCanImport(true);
	};
	const handleImportNas = async () => {
		setCanImport(false);

		displayStatus({
			type: "success",
			msg: "import Nasdaq100 success!",
		});
		setCompany([...company, ...Nasdaq100List]);
	};
	return (
		<>
			<Box component="form" noValidate sx={{ mt: 1 }}>
				<Stack spacing={2} direction="column">
					<SmallCaption_up>{example}</SmallCaption_up>
					<Stack spacing={3} direction="row">
						<Input
							required
							fullWidth
							id="function"
							label="My function"
							placeholder="if you want PE + ROET4Q > 5,type P+R>5"
							autoComplete="function"
							autoFocus
							onKeyPress={addFunct}
						/>
						{/* <Button variant="contained" disableElevation>
                Submit
              </Button> */}
					</Stack>
					<SmallCaption_up>your model :</SmallCaption_up>
					<SmallCaption_up>{funct}</SmallCaption_up>
				</Stack>
			</Box>
			<Box component="form" noValidate sx={{ mt: 1 }}>
				<Stack spacing={2} direction="column">
					<Stack spacing={3} direction="row">
						<Input
							required
							fullWidth
							id="function"
							label="My function"
							placeholder="Company tickers (ex: AAPL)"
							autoComplete="function"
							autoFocus
							onKeyPress={addCompany}
						/>
						<Button
							variant="contained"
							size="small"
							disabled={!canImport}
							onClick={handleImportNas}
						>
							import NASDAQ 100
						</Button>
					</Stack>
					<SmallCaption_up>company to be analysized :</SmallCaption_up>
					<Stack spacing={1}>
						{company.map((c, index) => (
							<SmallCaption_up key={index}>{c}</SmallCaption_up>
						))}
					</Stack>

					<Button variant="contained" onClick={handleModelSubmit}>
						Start
					</Button>
					<Space />
				</Stack>
			</Box>
		</>
	);
}
