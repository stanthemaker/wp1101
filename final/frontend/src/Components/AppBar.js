import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material/styles';
import {purple,red}  from '@mui/material/colors';
// import ThemeProvider from '@material-ui/core/styles/ThemeProvider';

// const primary=red[500];
export default function ButtonAppBar() {
  return (
    <Box sx={{
        width: `calc(100vw )`}}>
      <AppBar position="static" style={{background:'#260e04',opacity:1}} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{opacity:1}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
