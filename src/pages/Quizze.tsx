import { useCallback, useEffect, useState } from "react";
import { Box, Container, Fab, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import QuizCard from "../components/Quiz/QuizCard";
import StartQuizPopup from "../components/Quiz/StartQuizPopup";
import type { IQuiz } from "../interfaces/quiz";
import { useNavigate } from "react-router";
import {
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { theme } from "../util/theme";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store";
import {  deleteQuiz, fetchQuizzesForUser } from "../lib/slices/quizze";
import Loader from "../components/Loader/Loader";
import useTitle from "../customHook/PageTitle";
import useMetaDescription from "../customHook/PageDescription";
import UseMetaPageKeyWordsAndAuther from "../customHook/PageKeyWordsAndAuther";




export default function QuizList() {
  useTitle("Quizze");
  useMetaDescription("View the list of quizzes assigned by your teacher in the Test System. Access quiz details, start quizzes, and track your progress.");
  UseMetaPageKeyWordsAndAuther({
    keywords: "quiz list, exams, student, teacher",
  });
  // const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const {decoded}=useSelector((state:RootState)=>state.users)
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
  const nav=useNavigate();
  const [query, setQuery] = useState("");
  const {quizzes,loading}=useSelector((state:RootState)=>state.quiz);
  const dispatch=useDispatch<AppDispatch>(); 

  useEffect(()=>{
    dispatch(fetchQuizzesForUser());
  },[dispatch])

  console.log(quizzes);
  const handleSelectQuiz = useCallback((item: IQuiz) => {
    setOpenDialog(true);
    setSelectedQuiz(item);
    // navigate(`/quiz/${quizId}`) مثلا
  },[]);
  
  const handleDeleteQuize=(quizId:string)=>{
    dispatch(deleteQuiz(quizId));
    dispatch(fetchQuizzesForUser());
  }

  const startSelectQuiz = useCallback((quizId: string) => {
    setOpenDialog(false)
    nav(`/quizzes/${quizId}`)
  },[]);

  const handleClose = () => {
    setOpenDialog(false);
    // setSelectedQuiz(null);
  };



  return (
    <Container  sx={{ py: 4 }}>
      {loading &&
        <Box sx={{position:"fixed" ,left:0,top:0,width:"100%",minHeight:"100%", background:theme.palette.secondary.main,display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10"}}>
          <Loader/>
        </Box>
      }
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Quizzes
        </Typography>

        <TextField
          placeholder="Search quizzes..."
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {decoded?.role === "teacher" &&
          <Fab
            color="primary"
            aria-label="add"
            onClick={()=>nav("/addQuiz")}
            size="medium"
            sx={{ ml: { xs: 0, sm: 1,"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main} } }}
          >
            <AddIcon />
          </Fab>
          
        }
      </Box>
      <Grid container spacing={3} sx={{ mt: 2,display:"flex", justifyContent:"center" }} padding={3} paddingTop={7}>
        {quizzes?.length>0?
          quizzes?.map((quiz) => {
          return(
            <QuizCard key={quiz._id} quiz={quiz} handleSelectQuiz={handleSelectQuiz} handleDeleteQuize={handleDeleteQuize} />
          )
        })
        :
        <Typography variant="body1" color="textSecondary">
          No quizzes available.
        </Typography>
        }
        <StartQuizPopup handleClose={handleClose} startSelectQuiz={startSelectQuiz} openDialog={openDialog} selectedQuiz={selectedQuiz as IQuiz}/>
      </Grid>
    </Container>
  );
}
