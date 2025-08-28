import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CssBaseline, Box } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { theme } from '../util/theme';

interface IProps {
  setIsClosing: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  isClosing: boolean;
}

const drawerWidth = 240;

const AppBarComponenet = ({setMobileOpen,isClosing}:IProps) => {
    const handleDrawerToggle = () => {
      setMobileOpen(!isClosing);
    
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

          {/* 👤 User Icon */}
          <Box sx={{ ml: 2 }}>
            <IconButton size="large" edge="end" >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>
          </Box>
        </Toolbar>
        
      </AppBar>
    </>
  )
}

export default AppBarComponenet;