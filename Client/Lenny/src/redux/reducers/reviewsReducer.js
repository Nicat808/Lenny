import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../actions/review";
const initialState = {
  data: [],
  error: null,
  loading: false,
};
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, { payload }) => {
      state.data.push(payload);
    },
    deleteReview: (state, { payload }) => {
      state.data = state.data.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});
export default reviewSlice.reducer;
export const { addReview, deleteReview } = reviewSlice.actions;
