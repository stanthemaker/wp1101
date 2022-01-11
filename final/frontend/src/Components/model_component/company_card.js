import * as React from "react";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import Card from "@mui/material/Card";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { useStock } from "../../context/useStock"

const Space = styled.section`
height=0.5px;
`;

const cards = (
	<Card>
		<Stack
			spacing={1.5}
			justifycontent="center"
			direction="column"
			align="center"
		>
			<Space />
			<Stack direction="row" spacing={1}>
				<BedtimeIcon color="primary" />
				<Typography color="primary" variant="h7">
					company name
				</Typography>
				<Stack justifycontent="flex-end">
					<FavoriteBorderIcon color="primary" />
				</Stack>
			</Stack>
			<div>
				<Link color="primary" href="#"></Link>
			</div>
		</Stack>
	</Card>
);

export default function Model_Card() {
	const {passedcompany} = useStock()
	const [card, setCards] = useState([]) //card.map(()=><Cards>)?
	useEffect(()=>{
		if(!passedcompany){
			console.log("There's no passed company.")
		} else {
			setCards(passedcompany)
		}
	},[passedcompany])
	return (
		<Stack spacing={2}>
			<Typography component="p" variant="h7" color="primary">
				company pass the analysis
			</Typography>
			<Slide
				direction="up"
				in={true}
				in={true}
				style={{ transformOrigin: "0 0 0" }}
				{...(true ? { timeout: 1000 } : {})}
				justifycontent="center"
			>
				{cards}
			</Slide>
		</Stack>
	);
}
