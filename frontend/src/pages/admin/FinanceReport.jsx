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
} from "@mui/material";

// Dummy data—replace with real data fetching later
const monthlyData = [
  { period: "January", revenue: 12000 },
  { period: "February", revenue: 15000 },
  { period: "March", revenue: 14000 },
];

const weeklyData = [
  { period: "Week 1", revenue: 3000 },
  { period: "Week 2", revenue: 3500 },
  { period: "Week 3", revenue: 3200 },
  { period: "Week 4", revenue: 3300 },
];

const productData = [
  { productName: "4-Person Tent", revenue: 50000 },
  { productName: "Hiking Shoes", revenue: 42000 },
  { productName: "Climbing Rope", revenue: 31000 },
];

export default function FinanceReport() {
  const [tab, setTab] = useState(0);

  const handleChange = (_, newVal) => {
    setTab(newVal);
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
      <Typography variant="h4" gutterBottom>
        Báo cáo doanh thu
      </Typography>
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
