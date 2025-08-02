import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
} from "@mui/material";

const monthlyData = [
  { period: "January", revenue: 120000000 },
  { period: "February", revenue: 150000000 },
  { period: "March", revenue: 140000000 },
];

const weeklyData = [
  { period: "Week 1", revenue: 30000000 },
  { period: "Week 2", revenue: 35000000 },
  { period: "Week 3", revenue: 32000000 },
  { period: "Week 4", revenue: 33000000 },
];

const productData = [
  { productName: "4-Person Tent", revenue: 50000000 },
  { productName: "Hiking Shoes", revenue: 42000000 },
  { productName: "Climbing Rope", revenue: 31000000 },
];

export default function FinanceReport() {
  const [tab, setTab] = useState(0);

  const handleChange = (_, newVal) => {
    setTab(newVal);
  };

  const handleExportMonth = () => {
    console.log("Exporting monthly report...");
  };

  const handleExportYear = () => {
    console.log("Exporting yearly report...");
  };

  let rows;
  let headerLabel;
  if (tab === 0) {
    rows = monthlyData;
    headerLabel = "Tháng";
  } else if (tab === 1) {
    rows = weeklyData;
    headerLabel = "Tuần";
  } else {
    rows = productData;
    headerLabel = "Sản phẩm";
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Báo cáo doanh thu</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={handleExportMonth}>
            Xuất báo cáo tháng
          </Button>
          <Button variant="outlined" onClick={handleExportYear}>
            Xuất báo cáo năm
          </Button>
        </Stack>
      </Stack>

      <Tabs value={tab} onChange={handleChange} sx={{ mb: 2 }}>
        <Tab label="Theo tháng" />
        <Tab label="Theo tuần" />
        <Tab label="Theo sản phẩm" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{headerLabel}</TableCell>
              <TableCell align="right">Doanh thu (₫)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.period || row.productName}</TableCell>
                <TableCell align="right">
                  {row.revenue.toLocaleString()}₫
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
