import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../lib/store";
import { addQuiz } from "../lib/slices/quizze";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";
import useTitle from "../customHook/PageTitle";
import useMetaDescription from "../customHook/PageDescription";
import UseMetaPageKeyWordsAndAuther from "../customHook/PageKeyWordsAndAuther";
type AnswerForm = {
  text: string;
  isCorrect:boolean
};

type QuestionForm = {
  question: string;
  answers: AnswerForm[];
  correctAnswer: number;
};

type QuizForm = {
  course: {
    title: string;
    description: string;
  };
  title: string;
  description: string;
  questions: QuestionForm[];
};



const validationSchema = Yup.object({
  course: Yup.object({
    title: Yup.string().required("Course title is required"),
    description: Yup.string().required("Course description is required"),
  }),
  title: Yup.string().required("Quiz title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        question: Yup.string().required("Question is required"),
        answers: Yup.array()
          .of(
            Yup.object({
              text: Yup.string().required("Answer is required"),
            })
          )
          .min(2, "At least 2 answers are required"),
        correctAnswer: Yup.number()
          .min(0, "Must select a correct answer")
          .required("Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});


const AddQuiz = () => {
  useTitle("Add Quize");
  useMetaDescription("Add new quizzes for students in the Test System. Teachers can define questions, answers, and assign the quiz to courses linked to their account.");
  UseMetaPageKeyWordsAndAuther({
    keywords: "add quiz, create quiz, exams, teacher",
  });
  const { data, loading, error } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const nav=useNavigate();
  console.log(data);
  console.log(error);

  
  const formik = useFormik<QuizForm>({
    initialValues: {
      course: {
        title: "",
        description: "",
      },
      title: "",
      description: "",
      questions: [
      {
        question: "",
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        correctAnswer: 0,
      },
    ],
    },
    validationSchema,
    onSubmit:async (values) => {
      console.log("✅ Quiz Data:", values);
      const actionResult=await dispatch(addQuiz(values));
      const payload = actionResult.payload as { status: string; message: string; token: string };
      if(payload.status === "success"){
        toast.success("Quize Added")
        nav("/quizzes")
      }
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    formik;

  return (
    <FormikProvider value={formik}>
      {loading &&
        <Box sx={{position:"fixed" ,left:0,top:0,width:"100%",minHeight:"100%", background:"rgba(204, 204, 204, 0.6)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10"}}>
          <Loader/>
        </Box>
      }
      <Box sx={{ maxWidth: 700, mx: "auto", pt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Quiz
        </Typography>

        {/* Course Info */}
        <Card sx={{ p: 2, mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Course Title"
              name="course.title"
              value={values.course.title}
              onChange={handleChange}
              error={
                touched.course?.title && Boolean(errors.course?.title)
              }
              helperText={touched.course?.title && errors.course?.title}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Course Description"
              name="course.description"
              value={values.course.description}
              onChange={handleChange}
              error={
                touched.course?.description &&
                Boolean(errors.course?.description)
              }
              helperText={
                touched.course?.description && errors.course?.description
              }
            />
          </CardContent>
        </Card>

        {/* Quiz Info */}
        <Card sx={{ p: 2, mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Quiz Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Quiz Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>

        {/* Questions FieldArray */}
        <FieldArray
          name="questions"
          render={(arrayHelpers) => (
            <>
              {values.questions.map((q, qIndex) => (
                <Card key={qIndex} sx={{ mb: 2, p: 2 }}>
                  <CardContent>
                    {/* Question Text */}
                    <TextField
                      fullWidth
                      label={`Question ${qIndex + 1}`}
                      name={`questions[${qIndex}].question`}
                      value={q.question}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                    />

                    {/* Answers */}
                    <RadioGroup
                      value={q.correctAnswer}
                      onChange={(e) => {
                        const correctIndex = parseInt(e.target.value);

                        // update both correctAnswer and isCorrect flags
                        setFieldValue(`questions[${qIndex}].correctAnswer`, correctIndex);
                        const updatedAnswers = q.answers.map((ans, idx) => ({
                          ...ans,
                          isCorrect: idx === correctIndex,
                        }));
                        setFieldValue(`questions[${qIndex}].answers`, updatedAnswers);
                      }}
                    >
                      {q.answers.map((a, aIndex) => (
                        <Box
                          key={aIndex}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <FormControlLabel
                            value={aIndex}
                            control={<Radio />}
                            label=""
                          />
                          <TextField
                            fullWidth
                            label={`Answer ${aIndex + 1}`}
                            name={`questions[${qIndex}].answers[${aIndex}].text`}
                            value={a.text}
                            onChange={handleChange}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      ))}
                    </RadioGroup>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Add />}
                      onClick={() =>
                        setFieldValue(`questions[${qIndex}].answers`, [
                          ...q.answers,
                          { text: "" },
                        ])
                      }
                    >
                      Add Answer
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() =>
                    arrayHelpers.push({
                      question: "",
                      answers: [{ text: "" }],
                      correctAnswer: 0,
                    })
                  }
                >
                  Add Question
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleSubmit()}
                >
                  Save Quiz
                </Button>
              </Box>
            </>
          )}
        />
      </Box>
    </FormikProvider>
  );
};

export default AddQuiz;
