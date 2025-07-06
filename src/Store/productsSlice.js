import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { act } from "react";

const initialState = {
  users: [],
  // items: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }) => {
    const response = await axios.get(
      `http://localhost:3000/products?_page=${page}&_limit=${limit}`
    );
    console.log("response.headers:", response.headers);
    const totalCount = Number(response.headers["x-total-count"]);
    return { data: response.data, total: totalCount };
  }
);

export const addProduct = createAsyncThunk(
  "products/addProducts",
  async (newProduct, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        newProduct
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProducts",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async (updatedProduct, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${updatedProduct.id}`,
        updatedProduct
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  "products/fetchBySearch",
  async (searchTerm, thunkAPI) => {
    try {
      const query = encodeURIComponent(searchTerm);
      const response = await axios.get(
        `http://localhost:3000/products?title=${query}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // state.loading = false;
        // state.products = action.payload;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id == action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "خطای بارگذاری محصولات";
      });
  },
});

export default productsSlice.reducer;
