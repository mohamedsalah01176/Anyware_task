import {  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { theme } from "../../util/theme";
import type { IQuiz } from "../../interfaces/quiz";

interface IProps {
  openDialog: boolean;
  startSelectQuiz: (id:string) => void;
  handleClose: () => void;
  selectedQuiz: IQuiz;
}
const StartQuizPopup = ({openDialog,startSelectQuiz,handleClose,selectedQuiz}:IProps) => {
  return (
    <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Ready to Start?</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to start the quiz: <b>{selectedQuiz?.title}</b>.  
            Make sure you are prepared before continuing.
          </Typography>
          <Typography>
            {selectedQuiz?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={()=>startSelectQuiz(selectedQuiz?._id as string)} variant="contained" sx={{"&:hover":{color:theme.palette.primary.main,background:theme.palette.secondary.main}}}>Start</Button>
        </DialogActions>
      </Dialog>
  )
}

export default StartQuizPopup