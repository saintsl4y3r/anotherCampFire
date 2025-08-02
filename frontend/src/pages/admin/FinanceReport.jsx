import React, { useState, useEffect } from "react";
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
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
  alpha,
  Fade,
  Slide,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Download,
  CalendarMonth,
  DateRange,
  ShoppingBag,
  AttachMoney,
  ShowChart,
  Analytics,
  FileDownload,
  Visibility,
  Star,
} from "@mui/icons-material";

const monthlyData = [
  { period: "January", revenue: 120000000, growth: 12.5, trend: "up" },
  { period: "February", revenue: 150000000, growth: 25.0, trend: "up" },
  { period: "March", revenue: 140000000, growth: -6.7, trend: "down" },
];

const weeklyData = [
  { period: "Week 1", revenue: 30000000, growth: 8.2, trend: "up" },
  { period: "Week 2", revenue: 35000000, growth: 16.7, trend: "up" },
  { period: "Week 3", revenue: 32000000, growth: -8.6, trend: "down" },
  { period: "Week 4", revenue: 33000000, growth: 3.1, trend: "up" },
];

const productData = [
  { productName: "4-Person Tent", revenue: 50000000, growth: 15.2, trend: "up", category: "Camping" },
  { productName: "Hiking Shoes", revenue: 42000000, growth: 8.7, trend: "up", category: "Footwear" },
  { productName: "Climbing Rope", revenue: 31000000, growth: -2.1, trend: "down", category: "Climbing" },
];

const summaryStats = {
  totalRevenue: 410000000,
  totalGrowth: 12.8,
  totalOrders: 2847,
  avgOrderValue: 144000
};

export default function FinanceReport() {
  const [tab, setTab] = useState(0);
  const [animate, setAnimate] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (_, newVal) => {
    setTab(newVal);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);
  };

  const handleExportMonth = () => {
    console.log("Exporting monthly report...");
  };

  const handleExportYear = () => {
    console.log("Exporting yearly report...");
  };

  let rows;
  let headerLabel;
  let tabIcon;
  
  if (tab === 0) {
    rows = monthlyData;
    headerLabel = "Tháng";
    tabIcon = <CalendarMonth />;
  } else if (tab === 1) {
    rows = weeklyData;
    headerLabel = "Tuần";
    tabIcon = <DateRange />;
  } else {
    rows = productData;
    headerLabel = "Sản phẩm";
    tabIcon = <ShoppingBag />;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressColor = (growth) => {
    if (growth > 10) return 'success';
    if (growth > 0) return 'info';
    return 'error';
  };

  return (
    <Box 
      sx={{ 
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.05)} 0%, 
          ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        minHeight: '100vh',
        p: 4
      }}
    >
      {/* Floating Header */}
      <Fade in={animate} timeout={800}>
        <Paper
          elevation={12}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                📊 Báo cáo Doanh thu
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Phân tích chi tiết hiệu suất kinh doanh
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
              <Button
                variant="contained"
                startIcon={<FileDownload />}
                onClick={handleExportMonth}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Xuất báo cáo tháng
              </Button>
              <Button
                variant="contained"
                startIcon={<Analytics />}
                onClick={handleExportYear}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Xuất báo cáo năm
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>

      {/* Summary Cards */}
      <Fade in={animate} timeout={1000}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: "Tổng Doanh Thu",
              value: formatCurrency(summaryStats.totalRevenue),
              icon: <AttachMoney />,
              color: theme.palette.success.main,
              trend: `+${summaryStats.totalGrowth}%`
            },
            {
              title: "Tổng Đơn Hàng",
              value: summaryStats.totalOrders.toLocaleString(),
              icon: <ShoppingBag />,
              color: theme.palette.info.main,
              trend: "+18.2%"
            },
            {
              title: "Giá Trị TB/Đơn",
              value: formatCurrency(summaryStats.avgOrderValue),
              icon: <ShowChart />,
              color: theme.palette.warning.main,
              trend: "+5.7%"
            },
            {
              title: "Tỷ Lệ Tăng Trưởng",
              value: `${summaryStats.totalGrowth}%`,
              icon: <TrendingUp />,
              color: theme.palette.secondary.main,
              trend: "Xuất sắc"
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Slide in={animate} direction="up" timeout={800 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 30px ${alpha(stat.color, 0.3)}`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: stat.color,
                          width: 50,
                          height: 50,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Chip
                        label={stat.trend}
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="h4" fontWeight="bold" color={stat.color} gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* Main Content */}
      <Fade in={animate} timeout={1200}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          {/* Tabs Header */}
          <Box
            sx={{
              background: `linear-gradient(90deg, 
                ${alpha(theme.palette.primary.main, 0.08)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
              p: 3,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Tabs 
              value={tab} 
              onChange={handleChange}
              sx={{
                '& .MuiTab-root': {
                  minHeight: 60,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  margin: '0 8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    transform: 'translateY(-2px)',
                  },
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  }
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                }
              }}
            >
              <Tab icon={<CalendarMonth />} label="Theo tháng" iconPosition="start" />
              <Tab icon={<DateRange />} label="Theo tuần" iconPosition="start" />
              <Tab icon={<ShoppingBag />} label="Theo sản phẩm" iconPosition="start" />
            </Tabs>
          </Box>

          {/* Table Content */}
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {tabIcon}
                      <span>{headerLabel}</span>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    Doanh thu (₫)
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    Tăng trưởng
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    Xu hướng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <Slide key={idx} in={animate} direction="up" timeout={1000 + idx * 100}>
                    <TableRow
                      sx={{
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          transform: 'scale(1.01)',
                        },
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell sx={{ py: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              width: 40,
                              height: 40,
                            }}
                          >
                            {(row.period || row.productName).charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="600">
                              {row.period || row.productName}
                            </Typography>
                            {row.category && (
                              <Typography variant="caption" color="text.secondary">
                                {row.category}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3 }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {formatCurrency(row.revenue)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <Box sx={{ width: 100, mx: 'auto' }}>
                          <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color={row.growth > 0 ? 'success.main' : 'error.main'}
                            >
                              {row.growth > 0 ? '+' : ''}{row.growth}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={Math.abs(row.growth)}
                            color={getProgressColor(row.growth)}
                            sx={{ 
                              mt: 1, 
                              height: 6, 
                              borderRadius: 3,
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <IconButton
                          sx={{
                            bgcolor: row.trend === 'up' 
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.error.main, 0.1),
                            color: row.trend === 'up' 
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                            '&:hover': {
                              transform: 'scale(1.2)',
                              bgcolor: row.trend === 'up' 
                                ? alpha(theme.palette.success.main, 0.2)
                                : alpha(theme.palette.error.main, 0.2),
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {row.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </Slide>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer */}
          <Box
            sx={{
              p: 3,
              bgcolor: alpha(theme.palette.grey[100], 0.5),
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" color="primary">
                  <Visibility />
                </IconButton>
                <IconButton size="small" color="primary">
                  <Download />
                </IconButton>
                <IconButton size="small" color="primary">
                  <Star />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}