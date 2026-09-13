import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "velour_cart_items";

const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors (e.g. storage unavailable)
  }
};

const findItemIndex = (items, { id, size, color }) =>
  items.findIndex(
    (item) => item.id === id && item.size === size && item.color === color,
  );

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const quantity = payload.quantity ?? 1;
      const existingIndex = findItemIndex(state.items, payload);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ ...payload, quantity });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color),
      );
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const index = findItemIndex(state.items, { id, size, color });
      if (index >= 0) {
        if (quantity <= 0) {
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
