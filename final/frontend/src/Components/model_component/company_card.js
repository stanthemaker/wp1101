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
import Button from "@mui/material/Button";

const Space = styled.section`
height=0.5px;
`;

export default function Model_Card() {
	const { passedcompany, displayStatus } = useStock();
	const [cards, setCards] = useState([]); //card.map(()=><Cards>)?
	const [canAdd, setCanAdd] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const addFavorite = () => {
		setFavorite(!favorite);
	};

	useEffect(() => {
		if (!passedcompany.length) {
			displayStatus({
				type: "warning",
				msg: "No comanpy pass your model",
			});
		} else {
			setCards(passedcompany);
			setCanAdd(true);
		}
	}, [passedcompany]);

	return (
		<Stack spacing={2}>
			<Typography component="p" variant="h6" color="primary">
				Passed Companies
			</Typography>
			<Button variant="contained" disabled={!canAdd} onClick={addFavorite}>
				add all to my favorite
			</Button>
			{cards.map((card, index) => (
				<Slide
					direction="up"
					key={index}
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
							<Stack direction="row" spacing={2}>
								<Space />
								<Stack>
									{favorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon color="primary" />
									)}
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
