import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lineData: null,
  barData: null,
  pieData: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchLineData = createAsyncThunk(
  "charts/fetchLineData",
  async (_, thunkAPI) => {
    const res = await axios.get("http://localhost:3000/charts");
    return res.data.lineData;
  }
);

export const fetchBarData = createAsyncThunk(
  "charts/fetchBarData",
  async (_, thunkAPI) => {
    const res = await axios.get("http://localhost:3000/charts");
    return res.data.barData;
  }
);

export const fetchPieData = createAsyncThunk(
  "charts/fetchPieData",
  async (_, thunkAPI) => {
    const res = await axios.get("http://localhost:3000/charts");
    return res.data.pieData;
  }
);

// Slice
const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Line Chart
      .addCase(fetchLineData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLineData.fulfilled, (state, action) => {
        state.lineData = action.payload;
        state.loading = false;
      })
      .addCase(fetchLineData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Bar Chart
      .addCase(fetchBarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBarData.fulfilled, (state, action) => {
        state.barData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Pie Chart
      .addCase(fetchPieData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPieData.fulfilled, (state, action) => {
        state.pieData = action.payload;
        state.loading = false;
      })
      .addCase(fetchPieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chartSlice.reducer;
