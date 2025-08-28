import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token"); // replace "token" with your cookie name
};