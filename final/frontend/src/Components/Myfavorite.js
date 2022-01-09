import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Space_horizontal= styled.section`
  width:300px;
  height:50px;
`;

const cards = (
    <Card
     sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
     points="0,50 50,50 100,50"
    >
        <CardMedia
        component="img"
        sx={{
            // 16:9
            pt: '56.25%',
            }}
            image="https://source.unsplash.com/random"
            alt="random"
            />
        <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
            performance
        </Typography>
        <Typography>
            price
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">remove</Button>
        </CardActions>
        </Card>
        
);

const theme = createTheme();

const SmallCaption_up= styled.section`
  font-size:3em;
  font-family:"Times New Roman";
  color:white;
  opacity:0.8;
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
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            backgroundImage:'url(https://images.unsplash.com/photo-1638767306392-a30224cc2d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzOTIwNDk3OQ&ixlib=rb-1.2.1&q=80&w=1080)'
          }}
        >
          <Container maxWidth="sm" align="center">
            <SmallCaption_up>My favorite Stock</SmallCaption_up>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="sm">
        <Box sx={{ display: 'flex' }}>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
        >
          {cards}
        </Grow>
        <Space_horizontal/>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
        >
          {cards}
        </Grow>
        <Space_horizontal/>
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
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