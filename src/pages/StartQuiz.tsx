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
import type { IQuiz } from "../interfaces/quiz";




const StartQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz: IQuiz = {
  _id: quizId || "1",
  course: {
    title: "JavaScript Basics",
    description: "Test your JS knowledge",
    numberQuiz: 1,
  },
  questions: [
    {
      _id: "q1",
      question: "Which keyword is used to declare a constant in JS?",
      answers: [
        { text: "var", isCorrect: false },
        { text: "let", isCorrect: false },
        { text: "const", isCorrect: true },
        { text: "define", isCorrect: false },
      ],
    },
    {
      _id: "q2",
      question: "What is the output of typeof null?",
      answers: [
        { text: "null", isCorrect: false },
        { text: "object", isCorrect: true },
        { text: "undefined", isCorrect: false },
        { text: "number", isCorrect: false },
      ],
    },
  ],
  teacherId: "t1", // أي ID للمدرس
  numberStudent: 0, // لسه مفيش طلبة
  scores: [], // لسه محدش حل الكويز
  createdAt: new Date(),
  updatedAt: new Date(),
};


  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = quiz.questions[currentIndex];

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: value }));
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q) => {
      const selected = answers[q._id];
      const correct = q.answers.find((a) => a.isCorrect)?.text;
      if (selected === correct) score++;
    });

    alert(`You scored ${score} / ${quiz.questions.length}`);
    navigate("/quizzes");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 ,height:"80vh",display:"flex",justifyContent:"center", alignItems:"center",width:"100%"}}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3,width:"100%" }}>
        <Typography variant="h5" gutterBottom>
          {quiz.course.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Question {currentIndex + 1} of {quiz.questions.length}
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
