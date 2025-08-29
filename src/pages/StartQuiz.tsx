// StartQuiz.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../lib/store";
import { getSpecificQuiz } from "../lib/slices/quizze";
import type { IQuiz } from "../interfaces/quiz";
import ResultPopup from "../components/StartQuize/ResultPopup";



const StartQuiz = () => {
  const { quizId } = useParams();
  const nav = useNavigate();
  const { quiz }: { quiz: IQuiz | null } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch<AppDispatch>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openResult, setOpenResult] = useState(false);
  const [score, setScore] = useState<number | null>(null);


  useEffect(() => {
    if (quizId) {
      dispatch(getSpecificQuiz(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      console.log(e,"eeeeeeeeeee")
      nav("/quizzes")
    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => window.removeEventListener("beforeunload", handleWindowClose);
  }, []);


  const currentQuestion = quiz?.questions?.[currentIndex];

  const handleAnswerChange = (value: string) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion._id]: value }));
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let score = 0;
    quiz.questions.forEach((q) => {
      const selected = answers[q._id];
      const correct = q.answers.find((a) => a.isCorrect)?.text;
      if (selected === correct) score++;
    });

    setScore(score);
    setOpenResult(true)
  };

  const handleNavigation = () => {
    const answer = window.prompt("Type YES to leave the quiz");
    if (answer === "YES") {
      nav("/quizzes"); // Redirect لو كتب YES
    } else {
      // يبقى الطالب في نفس الصفحة
      alert("You stayed in the quiz");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ResultPopup score={score} openResult={openResult} quiz={quiz} setOpenResult={setOpenResult} />
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography variant="h5" gutterBottom>
            {quiz?.course?.title}
          </Typography>
          <Button variant="outlined" color="error" onClick={handleNavigation}>
            Leave Quiz
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Question {currentIndex + 1} of {quiz.questions?.length}
        </Typography>
        <Typography sx={{ mb: 2 }}>{currentQuestion.question}</Typography>

        <RadioGroup
          value={answers[currentQuestion._id] || ""}
          onChange={(e) => handleAnswerChange(e.target.value)}
        >
          {currentQuestion.answers.map((a, idx) => (
            <FormControlLabel
              key={idx}
              value={a.text}
              control={<Radio />}
              label={a.text}
            />
          ))}
        </RadioGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </Button>

          {currentIndex < quiz.questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default StartQuiz;
