import { Outlet } from "react-router"
import AuthNavbar from "../components/Auth/Navbar"

const AuthLayout = () => {
  return (
    <>
      <AuthNavbar/>
      <Outlet/>
    </>
  )
}

export default AuthLayout