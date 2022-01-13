import * as React from "react";
import { useState, useEffect } from "react";
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

const example = "Please remember to press Enter once you finish any input.";
let last = 0;

export default function InputForm() {
	const [funct, setFunct] = useState("");
	const [company, setCompany] = useState([]);
	const { runModel, displayStatus } = useStock();
	const [canSubmit, setcanSubmit] = useState(false);

	useEffect(() => {
		if (funct && company.length) {
			setcanSubmit(true);
		}
	}, [funct, company]);
	const addFunct = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (!e.target.value) {
				displayStatus({
					type: "error",
					msg: "Missing an inequation.",
				});
				return;
			} //todo: check validity of inequation
			setFunct(e.target.value);
			e.target.value = "";
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
	const handleModelSubmit = async (e) => {
		e.preventDefault();
		const message = await runModel(funct, company);
		setCompany([]);
		setFunct(" ");
		if (message === "success") {
			displayStatus({
				type: "success",
				msg: "run model success",
			});
		} else {
			displayStatus({
				type: "error",
				msg: message,
			});
		}
		return;
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
							placeholder="Your model (ex: P+R>5)"
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
						<Button variant="contained" size="small">
							import NASDAQ 100
						</Button>
					</Stack>
					<SmallCaption_up>company to be analysized :</SmallCaption_up>
					<Stack spacing={1}>
						{company.map((c, index) => (
							<SmallCaption_up key={index}>{c}</SmallCaption_up>
						))}
					</Stack>

					<Button
						variant="contained"
						disabled={!canSubmit}
						onClick={handleModelSubmit}
					>
						Start
					</Button>
					<Space />
				</Stack>
			</Box>
		</>
	);
}
