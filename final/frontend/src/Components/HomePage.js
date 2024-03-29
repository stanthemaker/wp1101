import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { keyframes } from "styled-components";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ReactDOM from "react-dom";
import { useStock } from "../context/useStock";
import calendar1 from "./img/1.jpg";
import calendar2 from "./img/2.jpg";
import calendar3 from "./img/3.jpg";
import calendar4 from "./img/4.jpg";
import calendar5 from "./img/5.jpg";
import calendar6 from "./img/6.jpg";
import calendar7 from "./img/7.jpg";
import calendar8 from "./img/8.jpg";
import calendar9 from "./img/9.jpg";
import calendar0 from "./img/0.jpg";
import { ContentCutOutlined } from "@mui/icons-material";
import AppBar from "./AppBar";
import { CardMedia } from "@mui/material";

const number1 = Math.floor(Math.random() * 10);
const number2 = Math.floor(Math.random() * 10);
// console.log(moment().format('L')[0]);

const month = moment().format("L")[0] + moment().format("L")[1];
const date = moment().format("L")[3] + moment().format("L")[4];

export const Style = styled.span`
	@font-face {
		font-family: "Noto Serif TC";
		src: url("https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap");
	}
`;

const Wrapper_vertical = styled.section`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const Wrapper_horizontal = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;

const fly_in_down = keyframes`
 0% {transform: translateY(-100%); opacity:0;}
 60% {transform: translateY(50%); opacity:0.7;}
 100% {transform: translateY(0%); opacity:0.8;}

`;
const fly_in_left = keyframes`
 0% {transform: translateX(-200%);}
 100% {transform: translateX(0%);}
`;

const appear = keyframes`
 0% {opacity:0.5;}
 50% {opacity:0.8;}
`;

const BigCaption = styled.section`
	font-size: 10em;
	color: white;
	font-family: "Times New Roman";
	opacity: 0.8;
	// &:hover{color:blue;}
	animation-name: ${appear};
	animation-duration: 2s;
	animation-iteration-count: 1;
`;

const SmallCaption_up = styled.section`
	font-size: 3em;
	font-family: "Times New Roman";
	color: white;
	opacity: 0.8;
	animation-name: ${fly_in_left};
	animation-duration: 3s;
	animation-iteration-count: 1;
`;

const SmallCaption_down = styled.section`
	font-size: 3em;
	font-family: "Times New Roman";
	color: white;
	opacity: 0.8;
	animation-name: ${fly_in_down};
	animation-duration: 4s;
	animation-iteration-count: 1;
	font-family: "Noto Serif TC";
`;

const Date = styled.section`
	font-size: 8em;
	font-family: "Times New Roman";
	color: white;
	opacity: 0.8;
	animation-name: ${fly_in_down};
	animation-duration: 4s;
	animation-iteration-count: 1;
`;

const Space_horizontal = styled.section`
	width: 300px;
	height: 50px;
`;

const img = [
	calendar0,
	calendar1,
	calendar2,
	calendar3,
	calendar4,
	calendar5,
	calendar6,
	calendar7,
	calendar8,
	calendar9,
];

function Header() {
	const { headline } = useStock();
	const [headlines, setHeadline] = useState("");
	useEffect(() => {
		setHeadline(headline);
	}, []);
	return (
		<>
			<Box
				sx={{
					backgroundImage: `url(${img[date % 9]})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: -50,
				}}
			>
				<>
					<Space_horizontal />
					<Wrapper_vertical>
						<Wrapper_horizontal>
							<SmallCaption_up>ritualize your daily</SmallCaption_up>
						</Wrapper_horizontal>
						<Wrapper_horizontal>
							<BigCaption>StocKalendar</BigCaption>
						</Wrapper_horizontal>
					</Wrapper_vertical>
					<Wrapper_horizontal>
						<Divider width="800px" color="white" />
					</Wrapper_horizontal>
				</>

				<Space_horizontal />
				<Box
					sx={{
						//width: `calc(98.7vw )`,
						backgroundPosition: -50,
						backgroundSize: "cover",
					}}
				>
					<Wrapper_horizontal>
						<Date>
							{month}/{date}
						</Date>
					</Wrapper_horizontal>
				</Box>
				<Box
					sx={{
						// backgroundColor: "rgba(0,0,0, .8)",
						width: `calc(60vw)`,
						margin: "auto",
						marginTop: "10%",
						backgroundPosition: -50,
						paddingTop: "1%",
						paddingLeft: "5%",
						paddingRight: "5%",
						paddingBottom: "10%",
						borderRadius: "5px",
					}}
				>
					<Paper
						sx={{
							backgroundColor: "rgba(255,255,255, .3)",
							padding: "5% 5% 5% 5%",
							elevation: "24",
							fontFamily: "Times New Roman",
							"&:hover": {
								// textDecoration: 'underline',
								backgroundColor: "rgba(0,0,0, .6)",
								boxShadow: 10,
								color: "black",
								// borderColor: 'primary',
							},
						}}
						// hover
					>
						<Typography
							fontFamily="Times New Roman"
							color="white"
							variant="h4"
							componant="h3"
						>
							headline news: {headlines}
						</Typography>
					</Paper>
				</Box>
			</Box>

			{/* <Box
				sx={{
					width: `calc(100vw )`,
					backgroundPosition: -50,

				}}
			></Box> */}
		</>
	);
}

export default Header;
