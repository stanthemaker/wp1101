import React from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	root: {
		justifyContent: "center",
		// minHeight: "100vh",
	},
	progress: {
		marginTop: "15vh",
	},
});
const Loading = () => {
	const classes = useStyles();
	return (
		<Container component="div" maxWidth="lg">
			<CssBaseline />
			<Grid container className={classes.root}>
				<Grid item className={classes.progress}>
					<CircularProgress />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Loading;
