import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Grow from "@mui/material/Grow";
import { keyframes } from "styled-components";
import Input from "@mui/material/Input";
import { useStock } from "../context/useStock";
import { FavoriteTwoTone } from "@mui/icons-material";
import { useEffect, useState } from "react";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Space_horizontal = styled.section`
	width: 50px;
	height: 50px;
`;
const Space = styled.section`
	width=10px;
  height=50px;
`;
const fly_in_down = keyframes`
 0% {transform: translateY(-10%); opacity:0;}
 100% {transform: translateY(0%); opacity:0.8;}

`;

// const cards = (

// );

const theme = createTheme();

const SmallCaption_up = styled.section`
	font-size: 3em;
	font-family: "Times New Roman";
	color: white;
	opacity: 0.9;
	animation-name: ${fly_in_down};
	animation-duration: 3s;
`;

export default function Album() {
	const {
		favorites,
		username,
		displayStatus,
		addFavorites,
		stockInfo,
		delFavorite,
	} = useStock();
	const [companies, setCompanies] = useState([]);
	const handleAddFavorite = async (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (!e.target.value) {
				displayStatus({
					type: "error",
					msg: "Missing a ticker.",
				});
				return;
			}
			const { message, info } = await stockInfo(e.target.value);
			if (message === "success") {
				//if the ticker exists
				const mes = await addFavorites(username, e.target.value);
				if (mes === "success") {
					displayStatus({
						type: "success",
						msg: "Company Added!",
					});
					setCompanies([...companies, info]);
				} else {
					displayStatus({
						type: "error",
						msg: mes,
					});
				}
				e.target.value = "";
				return;
			} else {
				displayStatus({
					type: "error",
					msg: message,
				});
			}
		}
	};
	const handleRemoveFavorites = async (index) => {
		// console.log("remove :", favorites[index]);
		const message = await delFavorite(username, favorites[index]);
		if (message === "success") {
			displayStatus({
				type: "success",
				msg: "Company removed!",
			});
			const newCompanyList = companies.filter(
				(company) => company.ticker !== favorites[index]
			);
			setCompanies(newCompanyList);
		} else {
			displayStatus({
				type: "error",
				msg: message,
			});
		}
		return;
	};
	useEffect(async () => {
		let companyList = [];
		for (let i = 0; i < favorites.length; i++) {
			const { info } = await stockInfo(favorites[i]);
			companyList.push(info);
		}
		setCompanies(companyList);
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						align: "center",
						bgcolor: "background.paper",
						pt: 8,
						pb: 6,
						backgroundPosition: "center",
						backgroundImage:
							"url(https://images.unsplash.com/photo-1640340435016-1964cf4e723b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MTg3NDc4OA&ixlib=rb-1.2.1&q=80&w=1080",
						backgroundSize: "cover",

						backgroundRepeat: "no-repeat",
					}}
				>
					<Container maxWidth="sm" align="center">
						<SmallCaption_up>My Favorite Stock</SmallCaption_up>
					</Container>
				</Box>
				<Container maxWidth="sm" align="center" sx={{ py: 6 }}>
					<Input
						required
						fullWidth
						id="stock"
						label="stock"
						placeholder="add stock (ex:AAPL),remeber to press Enter"
						autoComplete="stock"
						autoFocus
						onKeyPress={handleAddFavorite}
					/>
				</Container>
				<Container sx={{ py: 8 }} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{companies.map((company, i) => (
							<Grid item key={i} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Stack direction="row" spacing={4}>
										<CardMedia
											component="img"
											sx={{
												// 16:9
												width: "80px",
												height: "80px",
											}}
											image={`https://etoro-cdn.etorostatic.com/market-avatars/${company.ticker.toLowerCase()}/90x90.png`}
											alt="picture not found"
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography gutterBottom variant="h5" component="h2">
												{company.ticker}
											</Typography>
										</CardContent>
									</Stack>
									<CardContent>
										<Typography>{company.lastPrice} (Last closed)</Typography>
										<Typography
											style={{
												color:
													parseFloat(company.changePercentage) > 0
														? "green"
														: "red",
											}}
											sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}
										>
											{company.changePercentage}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											size="small"
											onClick={() => handleRemoveFavorites(i)}
										>
											remove
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</ThemeProvider>
	);
}
