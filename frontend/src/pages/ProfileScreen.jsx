import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Avatar, Button, TextField, Box
} from '@mui/material';
import { getAuth, updateProfile, signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: newName || displayName,
        photoURL: newPhoto || photoURL,
      });
      alert('Cập nhật thành công 💖');
      window.location.reload();
    } catch (err) {
      alert('Cập nhật thất bại 😢');
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👤 Hồ sơ của bạn
      </Typography>

      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <Avatar src={photoURL} sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="h6">{displayName || 'Không tên'}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
      </Box>

      <Box component="form" sx={{ maxWidth: 400 }} autoComplete="off">
        <TextField
          label="Tên hiển thị mới"
          fullWidth
          margin="normal"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <TextField
          label="Link ảnh đại diện mới"
          fullWidth
          margin="normal"
          value={newPhoto}
          onChange={(e) => setNewPhoto(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          Cập nhật hồ sơ
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mt: 2, ml: 2 }}>
          Đăng xuất
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileScreen;
