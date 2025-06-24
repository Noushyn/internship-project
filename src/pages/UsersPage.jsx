// import React from 'react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UsersTable from '../components/UsersTable';
import Navbar from "../components/Navbar"
import { addUser } from "../Store/users/usersSlice"
import UserForm from '../components/UserForm';

import {
  Button,
  Container,
  Typography,
  Modal,
  Box,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  minWidth: 400,
};

const UsersPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = (userData) => {
    dispatch(addUser(userData));
    setShowModal(false);
  };

  return (
    <>
    <Navbar />
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        لیست کاربران
      </Typography>

      <Button variant="contained" onClick={() => setShowModal(true)}>
        افزودن کاربر جدید
      </Button>

      <Modal open={showModal} onClose={() => setShowModal(false)} dir='rtl'>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>افزودن کاربر</Typography>
          <UserForm
            onSubmit={handleAddUser}
            onCancel={() => setShowModal(false)}
          />
        </Box>
      </Modal>

      <UsersTable />
    </Container>
    </>
  );
};

export default UsersPage;