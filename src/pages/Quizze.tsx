import { useCallback, useState } from "react";
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


const quizzes: IQuiz[] = [
  {
    _id: "66cf2e9f8a2fbc1e6d9e1b23",
    title: "JavaScript Basics",
    description: "Test your JS knowledge",
    course: {
      _id:"1",
      title: "JavaScript Basics",
      description: "Test your JS knowledge",
      numberQuiz: 1,
    },
    questions: [],
    teacherId: "t1",
    numberStudent: 0,
    scores: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "66cf2e9f8a2fbc1e6d9e1b24",
    title: "React Quiz",
    description: "All about React hooks and components",
    course: {
      _id:"2",
      title: "React Quiz",
      description: "All about React hooks and components",
      numberQuiz: 1,
    },
    questions: [],
    teacherId: "t2",
    numberStudent: 0,
    scores: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


export default function QuizList() {
  // const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
    const nav=useNavigate();
    const [query, setQuery] = useState("");

  const handleSelectQuiz = useCallback((item: IQuiz) => {
    setOpenDialog(true)
    setSelectedQuiz(item)
    // navigate(`/quiz/${quizId}`) مثلا
  },[]);
  
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

        <Fab
          color="primary"
          aria-label="add"
          onClick={()=>nav("/addQuiz")}
          size="medium"
          sx={{ ml: { xs: 0, sm: 1,"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main} } }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Grid container spacing={3} sx={{ mt: 2,display:"flex", justifyContent:"center" }} padding={3} paddingTop={7}>
        {quizzes.map((quiz) => {
        
          return(
            <QuizCard quiz={quiz} handleSelectQuiz={handleSelectQuiz} />
          )
        }
        )}
        <StartQuizPopup handleClose={handleClose} startSelectQuiz={startSelectQuiz} openDialog={openDialog} selectedQuiz={selectedQuiz as IQuiz}/>
      </Grid>
    </Container>
  );
}
