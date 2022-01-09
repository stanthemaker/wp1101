import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import DensitySmallOutlinedIcon from '@material-ui/core/icons-material/DensitySmallOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

const Wrapper_vertical = styled.section`
  display: flex;
  flex-direction: column;
`;

const Wrapper_horizontal = styled.section`
  display: flex;
  flex-direction: row;
`;

const buttons = [
  <Button  variant="contained" disableElevation  size="large" startIcon={<MenuOutlinedIcon/>}>Menu</Button>,
  <Button  size="large" endIcon={<LoginOutlinedIcon/>}>Login</Button>,
  <Button  size="large" endIcon={<FavoriteBorderOutlinedIcon/>}>My favorite</Button>,
  <Button  size="large" endIcon={<BrokenImageOutlinedIcon/>}>Model</Button>
];


function Menu() {
  return (
    <Wrapper_horizontal>
      <Wrapper_vertical>
        <ButtonGroup 
        orientation="vertical"
        variant="text">
        {buttons}
        </ButtonGroup>
      </Wrapper_vertical>
    </Wrapper_horizontal>
    
    
  );
}

export default Menu;
