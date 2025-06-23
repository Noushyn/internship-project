import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lineData: null,
  barData: null,
  pieData: null,
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLineSuccess: (state, action) => {
      state.lineData = action.payload;
      state.loading = false;
    },
    fetchBarSuccess: (state, action) => {
      state.barData = action.payload;
      state.loading = false;
    },
    fetchPieSuccess: (state, action) => {
      state.pieData = action.payload;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchLineSuccess,
  fetchBarSuccess,
  fetchPieSuccess,
  fetchFailure,
} = chartSlice.actions;

export default chartSlice.reducer;
console.log(chartSlice)



export const fetchLineData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get("http://localhost:3000/charts");
    dispatch(fetchLineSuccess(res.data.lineData));
  } catch (err) {
    dispatch(fetchFailure(err.message));
  }
};

export const fetchBarData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get("http://localhost:3000/charts");
    dispatch(fetchBarSuccess(res.data.barData));
  } catch (err) {
    dispatch(fetchFailure(err.message));
  }
};

export const fetchPieData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get("http://localhost:3000/charts");
    dispatch(fetchPieSuccess(res.data.pieData));
  } catch (err) {
    dispatch(fetchFailure(err.message));
  }
};
