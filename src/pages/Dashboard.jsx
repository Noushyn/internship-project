// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import Navbar from '../components/Navbar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Box,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Container,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/charts")
      .then((res) => res.json())
      .then((data) => {
        setLineData(data.lineData);
        setBarData(data.barData);
        setPieData(data.pieData);
        setLoading(false);
        console.log(data)
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Navbar />
        <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        داشبورد آماری
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              نمودار خطی - بازدید ماهانه
            </Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              نمودار میله‌ای - فروش محصولات
            </Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              نمودار دایره‌ای - مرورگرها
            </Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>    
    </>

  );
};

export default Dashboard;
