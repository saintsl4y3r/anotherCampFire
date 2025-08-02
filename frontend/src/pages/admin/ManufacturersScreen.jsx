import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ManufacturersScreen = () => {
  const [manufacturers, setManufacturers] = useState([
    'NatureHike',
    'Coleman',
    'Decathlon',
    'The North Face',
    'MSR',
  ]);
  const [newManufacturer, setNewManufacturer] = useState('');

  const handleAdd = () => {
    const name = newManufacturer.trim();
    if (name && !manufacturers.includes(name)) {
      setManufacturers((prev) => [...prev, name]);
      setNewManufacturer('');
    }
  };

  const handleDelete = (name) => {
    setManufacturers((prev) => prev.filter((m) => m !== name));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Quản lý Nhà Sản Xuất 🏕️
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Tên nhà sản xuất mới"
          value={newManufacturer}
          onChange={(e) => setNewManufacturer(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Thêm
        </Button>
      </Box>

      <Paper elevation={2}>
        <List>
          {manufacturers.map((name, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(name)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={name} />
              </ListItem>
              {index < manufacturers.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ManufacturersScreen;
