import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useDispatch } from "react-redux";
import { loginUser } from "../Store/authSlice";
import Navbar from "../components/Navbar";

const loginSchema = z.object({
  email: z.string().nonempty("ایمیل الزامی است").email("ایمیل معتبر نیست"),
  password: z
    .string()
    .nonempty("رمز عبور الزامی است")
    .min(6, "رمز باید حداقل ۶ کاراکتر باشد"),
});

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

    let role = "user";
    if (email === "admin@example.com" && password === "123456") {
      role = "admin";
    }
    dispatch(loginUser({ email, role }));
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
        minWidth="100vw"
      >
        <Paper elevation={3} sx={{ p: 4, width: 300 }}>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default LoginPage;
