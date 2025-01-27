import { RootState } from '../../store/store';

export const selectProducts = (state: RootState) => state.products.products;
export const selectFilteredProducts = (state: RootState) => state.products.filteredProducts;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;