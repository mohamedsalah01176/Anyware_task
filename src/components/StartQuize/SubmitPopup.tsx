import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { IQuiz } from "../../interfaces/quiz";

export interface IProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  score: number;
  quiz: IQuiz;
}

const SubmitPopup = ({openDialog,handleCloseDialog,score,quiz}:IProps) => {
  return (
  <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Quiz Result</DialogTitle>
  <DialogContent>
    <Typography sx={{ mb: 2 }}>
      You scored <b>{score}</b> / {quiz.questions.length}
    </Typography>

    {score > 5 ? (
      <Typography color="success.main" fontWeight="bold">
        🎉 Congratulations! You did great!
      </Typography>
    ) : (
      <Typography color="error.main" fontWeight="bold">
        😔 Keep practicing, you can do better next time!
      </Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseDialog}
      variant="contained"
      color="primary"
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

  )
}

export default SubmitPopup