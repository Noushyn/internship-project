// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import {
  fetchLineData,
  fetchBarData,
  fetchPieData,
} from "../Store/chartSlice";


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
  const dispatch = useDispatch();
  const { lineData, barData, pieData, loading, error } = useSelector(
    (state) => state.charts
    );

  useEffect(() => {
    dispatch(fetchLineData());
    dispatch(fetchBarData());
    dispatch(fetchPieData());
  }, [dispatch]);

  if (loading || !lineData || !barData || !pieData) {
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
