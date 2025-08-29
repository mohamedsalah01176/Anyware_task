import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { theme } from "../../util/theme";
import type { IQuiz } from "../../interfaces/quiz";


interface IProps{
  quiz:IQuiz,
  handleSelectQuiz:(item:IQuiz)=>void,
  handleDeleteQuize:(quizId:string)=>void,
}

const QuizCard = ({quiz,handleSelectQuiz,handleDeleteQuize}:IProps) => {


  return (
    <Grid item xs={12} sm={6} md={4} key={quiz._id}>
      <Card sx={{width:"290px", height:"160px"}}>
        <CardContent sx={{display:"flex",justifyContent:"space-between",flexDirection:"column",height: "100%"}}>
          <Box sx={{minHeight:"90px"}}>
            <Typography variant="h6">{quiz.title}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {quiz.description}
            </Typography>
          </Box>

          <Box sx={{display:"flex", gap:2,justifyContent:"flex-end"}}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{"&:hover":{
                background:theme.palette.secondary.main,
                color:theme.palette.primary.main
              }}}
              onClick={() =>{ handleSelectQuiz(quiz)}}
            >
              Start Quiz
            </Button>
            <Button 
              variant="outlined"  
              sx={{
                background:theme.palette.secondary.light,
                color:theme.palette.primary.main
              }}
              onClick={() =>handleDeleteQuize(quiz._id)}
            >
              Dlete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default QuizCard