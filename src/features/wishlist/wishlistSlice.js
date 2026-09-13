import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "velour_wishlist_slugs";

const loadWishlistFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
};

const initialState = {
  items: loadWishlistFromStorage(), // array of product slugs
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const slug = action.payload;
      if (state.items.includes(slug)) {
        state.items = state.items.filter((s) => s !== slug);
      } else {
        state.items.push(slug);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((s) => s !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
