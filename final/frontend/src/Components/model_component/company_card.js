import * as React from "react";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { useStock } from "../../context/useStock";
import CircularProgress from "@mui/material/CircularProgress";

const Space = styled.section`
height=0.5px;
`;

export default function Model_Card() {
	const {
		passedcompany,
		username,
		modelisRunning,
		displayStatus,
		addFavorites,
	} = useStock();
	const [cards, setCards] = useState([]); //card.map(()=><Cards>)?
	const [isAdd, setisAdd] = useState([]);
	const handleAddAllToFavorites = async (company, index) => {
		if (isAdd[index]) return;

		const { message } = await addFavorites(username, company);
		if (message === "success") {
			displayStatus({
				type: "success",
				msg: "Add company successfully",
			});
		}
		const newIsAdd = isAdd.map((e, i) => {
			if (i === index) return true;
			return e;
		});
		setisAdd(newIsAdd);
	};
	useEffect(() => {
		setCards(passedcompany);
		const tmp = new Array(passedcompany.length).fill(false);
		setisAdd([...tmp]);
	}, [passedcompany]);

	return (
		<Stack spacing={2}>
			<Typography component="p" variant="h6" color="primary">
				Passed Companies: {passedcompany.length}
			</Typography>

			{modelisRunning ? (
				<CircularProgress />
			) : (
				// <></>
				cards.map((card, index) => (
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
									<Stack
										onClick={() => {
											handleAddAllToFavorites(card, index);
										}}
									>
										{isAdd[index] ? (
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
				))
			)}
		</Stack>
	);
}
