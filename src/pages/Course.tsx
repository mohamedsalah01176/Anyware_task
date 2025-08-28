import {
  Box,
  Typography,
} from "@mui/material";
import CourseCard from "../components/Course/CourseCard";
import type { ICourse } from "../interfaces/course";

const courses :ICourse[]= [
  {
    _id: "1",
    title: "React for Beginners",
    description:
      "Learn the basics of React including components, hooks, and state management.",
    numberQuiz:10
  },
  {
    _id: "2",
    title: "Node.js Fundamentals",
    description:
    "Understand how to build scalable backend applications using Node.js and Express.",
    numberQuiz:3
  },
  {
    _id: "3",
    title: "MongoDB Masterclass",
    description:
    "Get hands-on experience with MongoDB, Mongoose, and NoSQL best practices.",
    numberQuiz:7
  },
];

const Course = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        Available Courses
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {courses.map((course) => (
          <CourseCard course={course}/>
        ))}
      </Box>
    </Box>
  );
};

export default Course;
