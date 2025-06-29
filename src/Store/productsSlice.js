import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts' , async(_, thunkAPI)=>{
    try{
        const res = await axios.get('http://localhost:3000/products')
        console.log("📦 Fetched products:", res.data);
        return res.data;
    }catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
})


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default productsSlice.reducer;