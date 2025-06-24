import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

const UserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    avatar: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, city , avatar } = formData;

    if (!name || !email || !city) {
    alert("لطفاً همه فیلدها را کامل پر کنید.");
    return;
  }

  onSubmit(formData);
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 400}} dir="rtl">
      <Stack spacing={2}>
        <TextField label="نام" name="name" value={formData.name} onChange={handleChange} />
        <TextField label="ایمیل" name="email" value={formData.email} onChange={handleChange} />
        <TextField label="شهر" name="city" value={formData.city} onChange={handleChange} />
        <TextField label="آواتار" name="avatar" value={formData.avatar} onChange={handleChange} />
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>افزودن</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>انصراف</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserForm;




