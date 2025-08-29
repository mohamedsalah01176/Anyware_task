import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { theme } from "../util/theme";
import { useDispatch, useSelector } from "react-redux";
import { register, fetchTeachersId } from "../lib/slices/user";
import type { AppDispatch, RootState } from "../lib/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export interface IUserBody {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
  teacherId?:string;
  createdAt: Date;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must contain at least one letter and one number")
    .required("Password is required"),
  role: Yup.string().oneOf(["student", "teacher"]).required("Role is required"),
});

const Register = () => {
  const dispatch=useDispatch<AppDispatch>();
  const {data,error,teachersId}=useSelector((state: RootState) => state.users);
  const nav=useNavigate();

  useEffect(()=>{
    dispatch(fetchTeachersId())
  },[dispatch])
  console.log(teachersId,"sssssss")
  console.log(error);

  const formik = useFormik<Omit<IUserBody, "_id" | "createdAt">>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      teacherId: "",
    },
    validationSchema,
    onSubmit:async (values, { setFieldError }) => {
      console.log("✅ Register Data:", values);
      if (values.role === "student") {
        if (!values.teacherId) {
            setFieldError("teacherId", "Please enter a Teacher ID");
            return;
        }

        const teacherExists = teachersId.some((t:{teacherId:string}) => t.teacherId === values.teacherId);
        if (!teacherExists) {
          setFieldError("teacherId", "Teacher ID not found");
          return;
        }
      }else{
        if (!values.teacherId) {
            setFieldError("teacherId", "Please enter a Teacher ID");
            return;
        }

        const teacherExists = teachersId.some((t:{teacherId:string}) => t.teacherId === values.teacherId);
        if (teacherExists) {
          setFieldError("teacherId", "Teacher ID ID is already taken");
          return;
      }
    }
      const actionResult= await dispatch(register(values));
      const payload = actionResult.payload as { status: string; message: string; token: string };
      console.log(payload,"gggggggggggggg")
      if(payload.status === "success"){
        setTimeout(()=>{
          nav("/login")
        },1000)
      }
    },
  });

  return (
    <Box sx={{background:theme.palette.secondary.main}}>

    <Box sx={{ maxWidth: 500, mx: "auto", pt: 4,minHeight:"92vh", display:"flex",justifyContent:"center",alignItems:"center"}} >
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* Email */}
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              margin="normal"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            {/* Role */}
            <TextField
              select
              fullWidth
              margin="normal"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </TextField>

            
            <TextField
              fullWidth
              margin="normal"
              label="Enter Teacher ID"
              name="teacherId"
              value={formik.values.teacherId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.teacherId && Boolean(formik.errors.teacherId)}
              helperText={formik.touched.teacherId && formik.errors.teacherId}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, "&:hover":{ background:theme.palette.secondary.main,color:theme.palette.primary.main} }}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
    </Box>
  );
};

export default Register;
