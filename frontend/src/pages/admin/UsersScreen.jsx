import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersScreen = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'admin' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'user' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'user' },
    { id: 4, name: 'Phạm Mai D', email: 'd@example.com', role: 'admin' },
  ]);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Quản lý Người Dùng 👥
      </Typography>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Tên</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Vai trò</strong></TableCell>
              <TableCell align="right"><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Xóa người dùng">
                    <IconButton onClick={() => handleDelete(user.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UsersScreen;
