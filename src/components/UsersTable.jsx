import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers , deleteUser } from '../Store/users/usersSlice';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, CircularProgress, IconButton, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) =>{
    if(window.confirm('آیا از حذف این کاربر مطمئنی؟')){
      dispatch(deleteUser(id))
    }
  }

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }} dir="rtl">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold"}} >آواتار</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>نام</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>ایمیل</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>شهر</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="right"><Avatar src={user.avatar} sx={{ width: 56, height: 56 }} /></TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.city}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
