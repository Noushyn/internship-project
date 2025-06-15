import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/authSlice'

function Login() {

const navigate = useNavigate();
const dispatch = useDispatch();

 const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Login Data:', data);
      const validEmail = 'test1@example.com';
      const validPassword = '123456';

    if (data.email === validEmail && data.password === validPassword) {
      dispatch(loginUser({ email: data.email }));
      navigate('/dashboard');
    } else {
      alert('ایمیل یا رمز عبور اشتباه است');
    }
    
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      minWidth="100vw"
      bgcolor="#f5f5f5"
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
            {...register("email", { 
              required: "ایمیل الزامی است", 
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "ایمیل معتبر نیست"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            {...register("password", { 
              required: "رمز عبور الزامی است", 
              minLength: {
                value: 6,
                message: "رمز باید حداقل ۶ کاراکتر باشد"
              }
            })}
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
  );

}

export default Login;
