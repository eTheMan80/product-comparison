import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export interface ProductsState {
  products: ProductProps[];
  filteredProducts: ProductProps[];
  error: string | null;
  loading: boolean;
};

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  error: null,
  loading: false
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<ProductProps[]>('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      state.filteredProducts = state.filteredProducts.filter((item) => action.payload.includes(item.id))
    },
    loadAllProducts: (state, action) => {
      state.filteredProducts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.loading = false;
      });
  },
});

export const { filterProducts, loadAllProducts } = productsSlice.actions

export default productsSlice.reducer;