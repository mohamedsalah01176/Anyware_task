import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { theme } from "../../util/theme";
import type { ICourse } from "../../interfaces/course";
const CourseCard = ({course}:{course:ICourse}) => {
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
        <Button size="small" variant="outlined" sx={{color:theme.palette.primary.main}}>
          Enroll
        </Button>
      </CardActions>
    </Card>
  )
}

export default CourseCard