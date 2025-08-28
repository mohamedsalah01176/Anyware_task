import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { theme } from "../util/theme";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const initialValues = { email: "", password: "" };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Login Data:", values);
    // 🔥 هنا ممكن تبعت القيم للباك اند بـ axios
  };

  return (
    <Box sx={{background:theme.palette.secondary.main}}>
      <Box sx={{ maxWidth: 500, mx: "auto", pt: 4,minHeight:"92vh", display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Card sx={{ width: 400, p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign={"center"}>
              Login
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* Email */}
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />

                  {/* Password */}
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2,"&:hover":{ background:theme.palette.secondary.main,color:theme.palette.primary.main} }}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
