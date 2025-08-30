import { Outlet } from "react-router"
import AuthNavbar from "../components/Auth/Navbar"
import { ToastContainer } from 'react-toastify';
import { theme } from '../util/theme';
import { Box } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box sx={{margin:0,background:theme.palette.secondary.main}}>
      <ToastContainer />
      <AuthNavbar/>
      <Outlet/>
    </Box>
  )
}

export default AuthLayout