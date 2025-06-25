
import { TextField, Button, Box, Stack } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const userSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  email: z.string().email("ایمیل نامعتبر است"),
  city: z.string().min(1, "شهر الزامی است"),
  avatar: z.string().url("آدرس تصویر معتبر وارد کنید").optional().or(z.literal("")),
});

const UserForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      avatar: '',
    },
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 400}} dir="rtl">
            <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="نام"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="ایمیل"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="شهر"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            label="آواتار"
            {...register("avatar")}
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
          />
          <Stack direction="row" sx={{ gap: 2 }}>
            <Button variant="contained" type="submit">افزودن</Button>
            <Button variant="outlined" color="secondary" onClick={onCancel}>انصراف</Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;




