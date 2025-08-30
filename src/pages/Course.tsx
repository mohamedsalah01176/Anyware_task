import {
  Box,
  Typography,
} from "@mui/material";
import CourseCard from "../components/Course/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store";
import { useCallback, useEffect } from "react";
import { deleteCourse, fetchCourses } from "../lib/slices/course";
import Loader from "../components/Loader/Loader";
import useTitle from "../customHook/PageTitle";
import useMetaDescription from "../customHook/PageDescription";
import UseMetaPageKeyWordsAndAuther from "../customHook/PageKeyWordsAndAuther";


const Course = () => {
  useTitle("Courses");
  useMetaDescription("View all courses assigned to you in the Test System. Access course details, linked quizzes, and teacher announcements.");
  UseMetaPageKeyWordsAndAuther({
    keywords: "courses, online tests, teacher, student, quizzes",
  });
  const {courses,loading,error}=useSelector((state:RootState)=>state.course);
  const {decoded}=useSelector((state:RootState)=>state.users);
  const dispatch=useDispatch<AppDispatch>();
  console.log(courses);
  console.log(error);

  useEffect(()=>{
    dispatch(fetchCourses());
  },[dispatch])

  const handleDeleteCourse=useCallback((courseId:string)=>{
    dispatch(deleteCourse(courseId))
    dispatch(fetchCourses());
  },[dispatch])
  return (
    <Box sx={{ p: 4 }}>
      {loading &&
        <Box sx={{position:"fixed" ,left:0,top:0,width:"100%",minHeight:"100%", background:theme.palette.secondary.main,display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10"}}>
          <Loader/>
        </Box>
      }
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" textAlign="center">
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
        {courses.length>0?
          courses.map((course) => (
            <CourseCard key={course._id} course={course} decoded={decoded} handleDeleteCourse={handleDeleteCourse}/>
          ))
        :
        <Typography variant="body1" color="textSecondary">
          No courses available.
        </Typography>
        }
      </Box>
    </Box>
  );
};

export default Course;
