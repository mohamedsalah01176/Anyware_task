import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { theme } from '../util/theme';
import { useLocation, useNavigate } from 'react-router';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  setIsClosing: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  mobileOpen: boolean;
}

export default function ResponsiveDrawer({window,setIsClosing,setMobileOpen,mobileOpen}: Props) {
  const nav=useNavigate();
  const {pathname}=useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };




  const drawer = (
    <div>
      {/* Logo in the drawer header */}
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '16px 0'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color:theme.palette.primary.contrastText }}>
          QuizFlow
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['dashboard', 'quizzes', 'courses', 'announcement'].map((text, index) => (
          <ListItem onClick={() => nav(text)} key={text} disablePadding>
            <ListItemButton
              sx={{
                paddingY: "20px",
                paddingX: "35px",
                width: "100%",
                backgroundColor: pathname === `/${text}` ? theme.palette.primary.contrastText : undefined,
                color:  theme.palette.primary.contrastText,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor:  theme.palette.primary.contrastText ,
                  color: pathname === `/${text}` ? theme.palette.primary.main : 'black',
                  '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                    color:theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname === `/${text}` ? theme.palette.primary.main : theme.palette.primary.contrastText,
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  color: pathname === `/${text}` ? theme.palette.primary.main : theme.palette.primary.contrastText,
                  transition: 'all 0.2s ease-in-out',
                  fontWeight: pathname === `/${text}` ? '600' : '400',
                  textTransform:"capitalize"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} color={"text"}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },background:theme.custom.gradient }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,background:theme.custom.gradient },
            
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,background:theme.custom.gradient },
            
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
