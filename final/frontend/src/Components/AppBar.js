import * as React from 'react';
import clsx from "clsx";
import { useHistory, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';

// const pages = ['My Favorote', 'Model', 'Home'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import {useStock} from "../context/useStock"

const ResponsiveAppBar = ({children}) => {
  let history = useHistory();
  const {signedIn} = useStock()
  // const history = useHistory();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  function handleChangePage(page){
    console.log(`change to ${page}`)
    history.push(page);
    // history.pushState(page)
    
  }
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <div>
    <AppBar position="fixed" style={{backgroundColor:"#000000", display: signedIn? "":"none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
          >
            <div
              style={{cursor: "pointer"}}
              onClick={()=> history.push("/")}
            >
            StocKalendar
            </div>
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> */}
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            > */}
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              {/* <MenuItem key="myfavorite" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">MY FAVORITE</Typography>
                </MenuItem> */}
            {/* </Menu> */}
          {/* </Box> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Button
              key="MY FAVORITE"
              component={Link}
              to="/myfavorite"
              onClick={handleChangePage("/myfavorite")}
              sx={{ my: 2, color: 'white', display: 'flex' }}
            >
              MY FAVORITE
            </Button>
            <Button
              key="MODEL"
              component={Link}
              to="/model"
              onClick={handleChangePage("/model")}
              sx={{ my: 2, color: 'white', display: 'flex' }}
            >
              MODEL
            </Button>
            <Button
              key="MAIN"
              component={Link}
              to="/"
              onClick={handleChangePage("/")}
              sx={{ my: 2, color: 'white', display: 'flex' }}
            >
              MAIN
            </Button>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <div>
      {children}
    </div>
    </div>
  );
};
export default ResponsiveAppBar;