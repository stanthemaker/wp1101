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
	width: 300px;
	height: 50px;
`;
const Space = styled.section`
  width: 50px;
  height=50px;
`;
const fly_in_down = keyframes`
 0% {transform: translateY(-10%); opacity:0;}
 100% {transform: translateY(0%); opacity:0.8;}

`;

const cards = (
	<Card
		sx={{
			height: "50%",
			display: "flex",
			flexDirection: "column",
			width: `calc(100vw )`,
		}}
		// points="0,50 50,50 100,50"
	>
		<CardContent sx={{ flexGrow: 1 }} justifycontent="center">
			<Stack direction="row">
				<CardMedia
					component="img"
					sx={{
						// 16:9

						width: "50px",
						height: "50px",
					}}
					image="http://t1.gstatic.com/images?q=tbn:ANd9GcSjoU2lZ2eJX3aCMfiFDt39uRNcDu9W7pTKcyZymE2iKa7IOVaI"
				/>
				<Space />
				<Stack>
					<Typography>company name</Typography>
					<Typography gutterBottom variant="h5" component="h2">
						performance
					</Typography>
					<Typography>price</Typography>
				</Stack>
			</Stack>
		</CardContent>
		<Stack direction="row" justifycontent="center">
			<CardActions>
				<Button size="small">remove</Button>
			</CardActions>
		</Stack>
	</Card>
);

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
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						align: "center",
						width: `calc(100vw )`,
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
				<Container maxWidth="sm" align="center">
					<Input
						required
						fullWidth
						id="stock"
						label="stock"
						placeholder="add stock"
						autoComplete="stock"
						autoFocus
					/>
				</Container>
				<Container sx={{ py: 8 }}>
					<Box sx={{ display: "flex" }}>
						<Grow
							in={true}
							style={{ transformOrigin: "0 0 0" }}
							{...(true ? { timeout: 1000 } : {})}
						>
							{cards}
						</Grow>
						<Space_horizontal />
						<Grow
							in={true}
							style={{ transformOrigin: "0 0 0" }}
							{...(true ? { timeout: 1000 } : {})}
						>
							{cards}
						</Grow>
						<Space_horizontal />
						<Grow
							in={true}
							style={{ transformOrigin: "0 0 0" }}
							{...(true ? { timeout: 1000 } : {})}
						>
							{cards}
						</Grow>
					</Box>
				</Container>
			</main>
		</ThemeProvider>
	);
}
