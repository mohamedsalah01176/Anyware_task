import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";


type QuestionForm = {
  question: string;
  answers: string[];
  correctAnswer: number;
};

type QuizForm = {
  title: string;
  description: string;
  questions: QuestionForm[];
};
const validationSchema = Yup.object({
  title: Yup.string().required("Quiz title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        question: Yup.string().required("Question is required"),
        answers: Yup.array()
          .of(Yup.string().required("Answer is required"))
          .min(2, "At least 2 answers are required"),
        correctAnswer: Yup.number()
          .min(0, "Must select a correct answer")
          .required("Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

const AddQuiz = () => {
  const formik = useFormik<QuizForm>({
    initialValues: {
      title: "",
      description: "",
      questions: [{ question: "", answers: [""], correctAnswer: 0 }],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("✅ Quiz Data:", values);
      // تقدر تبعت values للباك إند باستخدام axios.post
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Box sx={{ maxWidth: 700, mx: "auto", pt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Quiz
        </Typography>

        {/* Title & Description */}
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
              label="Description"
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TextField
                        fullWidth
                        label={`Question ${qIndex + 1}`}
                        name={`questions[${qIndex}].question`}
                        value={q.question}
                        onChange={handleChange}
                        error={
                          touched.questions?.[qIndex]?.question &&
                          typeof errors.questions?.[qIndex] !== "string" &&
                          Boolean(errors.questions?.[qIndex]?.question)
                        }
                        helperText={
                          touched.questions?.[qIndex]?.question &&
                          typeof errors.questions?.[qIndex] !== "string"
                            ? errors.questions?.[qIndex]?.question
                            : ""
                        }
                        sx={{ mb: 2 }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => arrayHelpers.remove(qIndex)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    {/* Answers with correctAnswer selection */}
                    <RadioGroup
                      value={q.correctAnswer}
                      onChange={(e) =>
                        setFieldValue(
                          `questions[${qIndex}].correctAnswer`,
                          parseInt(e.target.value)
                        )
                      }
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
                            name={`questions[${qIndex}].answers[${aIndex}]`}
                            value={a}
                            onChange={handleChange}
                            error={
                              touched.questions?.[qIndex]?.answers?.[aIndex] &&
                              Boolean(
                                errors.questions?.[qIndex]?.answers?.[aIndex]
                              )
                            }
                            helperText={
                              touched.questions?.[qIndex]?.answers?.[aIndex] &&
                              errors.questions?.[qIndex]?.answers?.[aIndex]
                            }
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
                          "",
                        ])
                      }
                    >
                      Add Answer
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Add Question Button */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() =>
                    arrayHelpers.push({
                      question: "",
                      answers: [""],
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
