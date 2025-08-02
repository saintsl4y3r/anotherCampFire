import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from '@mui/material';

const SettingsScreen = () => {
  const [siteName, setSiteName] = useState('CampFire');
  const [currency, setCurrency] = useState('VND');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supportEmail, setSupportEmail] = useState('support@campfire.vn');

  const handleSave = () => {
    alert('🔧 Đã lưu cấu hình hệ thống!');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Cài đặt hệ thống ⚙️
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin chung
        </Typography>
        <TextField
          fullWidth
          label="Tên hệ thống"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email hỗ trợ"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Đơn vị tiền tệ"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Trạng thái hệ thống
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode(!maintenanceMode)}
            />
          }
          label="Bảo trì hệ thống"
        />

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ textTransform: 'none' }}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsScreen;
