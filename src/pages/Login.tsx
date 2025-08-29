import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { theme } from "../util/theme";
import { useDispatch, useSelector } from "react-redux";
import { LoginFetching } from "../lib/slices/user";
import type { AppDispatch, RootState } from "../lib/store";
import { useNavigate } from "react-router";
import Cookie from "js-cookie"
const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data}=useSelector((state:RootState)=>state.users)
  const nav=useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async(values) => {
      const actionResult = await dispatch(LoginFetching(values));
      const payload = actionResult.payload as { status: string; message: string; token: string };
      console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaa")
      if(payload.status === "success"){
        setTimeout(()=>{
          nav("/dashboard");
        },1000)
        Cookie.set("token", payload?.token, {
          expires: 7,    
          secure: true,     
          sameSite: "Strict"
        });
      }
    },
  });

  return (
    <Box sx={{ background: theme.palette.secondary.main }}>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          pt: 4,
          minHeight: "92vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 400, p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
              Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  "&:hover": {
                    background: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
