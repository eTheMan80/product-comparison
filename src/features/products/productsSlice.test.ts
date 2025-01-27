import { describe, it, expect, beforeEach, vi } from "vitest";
import productReducer, { fetchProducts, ProductProps, ProductsState } from "./productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import mockData from "../../mock/mockData.json"

vi.mock("axios", () => ({
  axios: vi.fn()
}))

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  error: null,
  loading: false
};

const mockProduct: ProductProps[] = mockData

describe("productSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        product: productReducer
      }
    })
    return store;
  });

  it("should return the initial state", () => {
    expect(productReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle fetchProducts pending state", () => {
    const action = {
      type: fetchProducts.pending.type
    };
    const state = productReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });

  it("should handle fetchProducts fulfilled state", () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: { ...mockProduct }
    };
    const state = productReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      products: action.payload,
      filteredProducts: action.payload,
      loading: false,
      error: null
    })
  });

  it("should handle fetchProducts rejected state", () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: "Failed to fetch products" }
    };
    const state = productReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: action.error.message,
      loading: false
    })
  });
});