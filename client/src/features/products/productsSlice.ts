import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (payload: any) => {
  const response = await axios.post('/api/getProducts', payload);
  return response.data.data;
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false, isSearched: false },
  reducers: {},
  extraReducers: (builder: any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProducts.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.isSearched = true;
      // Add products to the state array
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.pending, (state: any, action: any) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.rejected, (state: any, action: any) => {
      state.isSearched = true;
      state.loading = false;
    })
  }
});

export default productsSlice.reducer
