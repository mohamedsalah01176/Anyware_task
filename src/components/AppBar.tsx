import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CssBaseline, Box, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { theme } from '../util/theme';
import { useEffect, useState } from 'react';
import { Brightness4, Brightness7, Logout } from '@mui/icons-material';
import Cookie from "js-cookie";
import { useNavigate } from 'react-router';
import { getToken } from '../util/getToken';
import { useDispatch } from 'react-redux';
import { setDecodedToken } from '../lib/slices/user';
import LanguageIcon from "@mui/icons-material/Language";


interface IProps {
  setIsClosing: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  isClosing: boolean;
}

const drawerWidth = 240;

const AppBarComponenet = ({setMobileOpen,isClosing}:IProps) => {
  const token =getToken();
  const dispatch =useDispatch()
  const nav=useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    dispatch(setDecodedToken(token))
    getToken()
  },[])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    Cookie.remove("token");
    nav("/login") 
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!isClosing);
  };
  const handleLanguageChange = () => {
    console.log("i will add ")
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background:theme.palette.primary.dark,
        }}
      >
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color:theme.palette.secondary.contrastText}} fontSize={"26px"}>
            Welcome Mohamed
          </Typography>
          <Box sx={{display:"flex",alignItems:"center"}} >

            
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleLanguageChange} >
                <LanguageIcon />
              </IconButton>
              
              <IconButton onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <IconButton size="large" edge="end">
                <AccountCircle fontSize="large" />
              </IconButton>
            </Box>
            <Tooltip title="Logout">
              <IconButton color="error" onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        
      </AppBar>
    </>
  )
}

export default AppBarComponenet;