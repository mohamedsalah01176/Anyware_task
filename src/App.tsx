import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { theme } from './util/theme'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserLayout from './layout/UserLayout';
import MainDashboar from './pages/MainDashboar';
import Quizze from './pages/Quizze';
import Course from './pages/Course';
import Announcement from './pages/Announcement';
import StartQuiz from './pages/StartQuiz';
import NotFoundPage from './pages/NotFoundPage';
import { initReactI18next } from 'react-i18next';
import transitionAR from "./transition/ar.json";
import transitionEn from "./transition/en.json";
import i18n from "i18next";
import AddQuiz from './pages/AddQuiz';
import AuthLayout from './layout/AuthLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import { Provider } from 'react-redux'
import { store } from './lib/store';
import UnResiteredProtectedRoute from './HOC/UnResiteredProtectedRoute';
import RegisteredProtectedRoute from './HOC/RegisteredProtectedRoute';


const router = createBrowserRouter([
  {path: "/",element:<RegisteredProtectedRoute><AuthLayout/></RegisteredProtectedRoute>,children:[
    {index:true,element:<Register/>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
  ]},
  {path: "/",element:<UnResiteredProtectedRoute><UserLayout/></UnResiteredProtectedRoute>,children:[
    {index:true,path:"dashboard",element:<MainDashboar/>},
    {path:"/quizzes",element:<Quizze/>},
    {path:"/quizzes/:quizId",element:<StartQuiz/>},
    {path:"/courses",element:<Course/>},
    {path:"/addQuiz",element:<AddQuiz/>},
    {path:"/announcement",element:<Announcement/>},
  ]},
  {path:"*",element:<NotFoundPage/>}
]);


function App() {

  const savedLang = localStorage.getItem("lang");
  const browserLang = navigator.language.split("-")[0];

  
  const resources={
    en:{
      translation: transitionEn
    },
    ar:{
      translation: transitionAR
    }
  }

  i18n
  .use(initReactI18next) 
  .init({

    resources,
    lng: savedLang|| browserLang || "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />,
      </ThemeProvider> 
    </Provider>
  )
}

export default App
