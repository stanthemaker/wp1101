import * as React from "react";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import Card from "@mui/material/Card";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { useStock } from "../../context/useStock";

const Space = styled.section`
height=0.5px;
`;

export default function Model_Card() {
	const { passedcompany } = useStock();
	const [cards, setCards] = useState([]); //card.map(()=><Cards>)?
	useEffect(() => {
		if (!passedcompany) {
			console.log("There's no passed company.");
		} else {
			setCards(passedcompany);
		}
	}, [passedcompany]);

	return (
		<Stack spacing={2}>
			<Typography component="p" variant="h7" color="primary">
				Passed Companies:
			</Typography>

			{cards.map((card, index) => (
				<Slide
					direction="up"
					in={true}
					in={true}
					style={{ transformOrigin: "0 0 0" }}
					{...(true ? { timeout: 1000 } : {})}
					justifycontent="center"
				>
					<Card>
						<Stack
							spacing={1.5}
							justifycontent="center"
							direction="column"
							align="center"
						>
							<Space />
							<Stack direction="row" spacing={1}>
								<Space />
								<Stack justifycontent="flex-end">
									<FavoriteBorderIcon color="primary" onClick={() => {}} />
								</Stack>
								<Typography color="primary" variant="h7" key={index}>
									{card}
								</Typography>
							</Stack>
							<div>
								<Link color="primary" href="#"></Link>
							</div>
						</Stack>
					</Card>
				</Slide>
			))}
		</Stack>
	);
}
