import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { theme } from "../../util/theme";
import type { ICourse } from "../../interfaces/course";
import type { IUserBody } from "../../interfaces/user";


const CourseCard = ({course,decoded,handleDeleteCourse}:{course:ICourse,decoded:IUserBody | null,handleDeleteCourse:(id:string)=>void}) => {
  return (
    <Card
      key={course._id}
      sx={{
        width: 300,
        height:180,
        paddingBottom:"5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        
        <Button size="small" variant="contained" color="primary" sx={{"&:hover":{background:theme.palette.secondary.main,color:theme.palette.primary.main}}}>
          View
        </Button>

        {decoded?.role === "student" ?
        <Button size="small" variant="outlined" color="primary" >
          Enroll
        </Button>
        :
        <Button size="small" variant="outlined" color="error" onClick={()=>handleDeleteCourse(course._id)}>
          Dlete
        </Button>
        }
      </CardActions>
    </Card>
  )
}

export default CourseCard