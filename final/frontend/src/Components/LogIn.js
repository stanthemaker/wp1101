import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from 'styled-components'
import styled from 'styled-components';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const fly_in_left = keyframes`
 0% {transform: translateX(-200%);}
 100% {transform: translateX(0%);}
`

const appear = keyframes`
 0% {opacity:0.5;}
 50% {opacity:0.8;}
`

const fly_in_down = keyframes`
 0% {transform: translateY(-100%); opacity:0;}
 60% {transform: translateY(50%); opacity:0.7;}
 100% {transform: translateY(0%); opacity:0.8;}

`

const SmallCaption_up= styled.section`
  font-size:2.3em;
  font-family:"Times New Roman";
  color:white;
  opacity:0.8;
  animation-name: ${fly_in_down};
  animation-duration: 3s;
  animation-iteration-count: 1;
`;

const BigCaption= styled.section`
  font-size:8em;
  color:white;
  font-family:"Times New Roman";
  opacity:1;
  // &:hover{color:blue;}
  animation-name: ${appear};
  animation-duration: 2s;
  animation-iteration-count: 1;
`;

const Wrapper_horizontal = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Space_horizontal= styled.section`
  width:50px;
  height:100px;
`;

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <Space_horizontal/>
            <Wrapper_horizontal>
                <BigCaption>StocKalendar</BigCaption>
            </Wrapper_horizontal>
            <Wrapper_horizontal>
                <SmallCaption_up>ritualize your daily</SmallCaption_up>
            </Wrapper_horizontal>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
