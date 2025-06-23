import React from 'react';
import { Container, Typography } from '@mui/material';
import UsersTable from '../components/UsersTable';
import Navbar from "../components/Navbar"

const UsersPage = () => {
  return (
    <>
    <Navbar />
    <Container >
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 , fontWeight: "bold"}}>
        لیست کاربران
      </Typography>
      <UsersTable />
    </Container>
    </>

  );
};

export default UsersPage;