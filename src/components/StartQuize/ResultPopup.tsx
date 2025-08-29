import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router";
import type { IQuiz } from "../../interfaces/quiz";
import { theme } from "../../util/theme";

interface IProps {
  openResult: boolean;
  setOpenResult: React.Dispatch<React.SetStateAction<boolean>>;
  score: number | null;
  quiz: IQuiz | null;
}

const ResultPopup = ({openResult,setOpenResult,score,quiz}:IProps) => {
  const nav=useNavigate()
  return (
    <Dialog open={openResult} onClose={() => setOpenResult(false)} PaperProps={{
    sx: {
      p: 2,
      minHeight: "250px",
      width: {
        xs: "90%",   
        sm: "70%",  
        md: "40%",     
      }, 
      borderRadius: 4,
    },
  }} >
      <DialogTitle>Quiz Result</DialogTitle>
      <DialogContent>
        <Typography>
          You scored {score} / {quiz?.questions?.length}
        </Typography>

        {score !== null && (
          <Typography
            color={score >= (quiz?.questions?.length ?? 0) / 2 ? "success.main" : "error.main"}
            sx={{ mt: 2 }}
          >
            {score >= (quiz?.questions?.length ?? 0) / 2
              ? "🎉 Great job! You passed!"
              : "❌ Keep practicing, you can do better!"}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main}}} onClick={() => nav("/quizzes")}>
          Back to Quizzes
        </Button>
        {/* <Button variant="outlined" onClick={() => setOpenResult(false)}>Close</Button> */}
      </DialogActions>
    </Dialog>

  )
}

export default ResultPopup