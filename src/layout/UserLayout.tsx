import React, { useEffect } from 'react'
import ResponsiveDrawer from '../components/Drawer';
import AppBarComponenet from '../components/AppBar';
import { Outlet, useLocation } from 'react-router';
import { Box } from '@mui/material';
import { theme } from '../util/theme';
import { useTranslation } from 'react-i18next';

const UserLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);


  const {i18n}=useTranslation();
  useEffect(()=>{

  },[i18n])

  const {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
  })
  },[pathname])
  return (
    <Box sx={{background:theme.palette.secondary.main}}>
      <AppBarComponenet isClosing={isClosing} setIsClosing={setIsClosing} setMobileOpen={setMobileOpen} />
      <ResponsiveDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}  setIsClosing={setIsClosing} />
      <Box sx={{marginTop:"60px",marginLeft: { sm: "240px" },background:theme.palette.secondary.main,minHeight:"89vh",marginBottom:0}}>
        <Outlet/>
      </Box>
    </Box>
  )
}

export default UserLayout