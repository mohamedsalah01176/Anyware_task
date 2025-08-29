import { Outlet } from "react-router"
import AuthNavbar from "../components/Auth/Navbar"
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  return (
    <>
      <ToastContainer />
      <AuthNavbar/>
      <Outlet/>
    </>
  )
}

export default AuthLayout