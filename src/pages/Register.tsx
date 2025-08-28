import React, { useEffect } from "react";
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
import { register } from "../assets/lib/slices/user";
import type { AppDispatch, RootState } from "../assets/lib/store";

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
    .required("Password is required"),
  role: Yup.string().oneOf(["student", "teacher"]).required("Role is required"),
});

const Register = () => {
  const dispatch=useDispatch<AppDispatch>();
  const {data,error}=useSelector((state: RootState) => state.users)

  console.log(data,"data")
  console.log(error,"error")
  const formik = useFormik<Omit<IUserBody, "_id" | "createdAt">>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      teacherId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("✅ Register Data:", values);
      // Here you can call your API with axios.post("/register", values);
      dispatch(register(values))
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
              error={formik.touched.teacherId && Boolean(formik.errors.teacherId)}
              helperText={formik.touched.teacherId && formik.errors.teacherId}
            />
            {/* Submit */}
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
