import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "velour_orders";

const loadOrdersFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore write errors
  }
};

const initialState = {
  orders: loadOrdersFromStorage(),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      saveOrdersToStorage(state.orders);
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
