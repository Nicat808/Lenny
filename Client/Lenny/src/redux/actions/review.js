import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../helpers";
export const getReviews = createAsyncThunk(
  "review/fetchReview",
  async (id, { rejectWithValue }) => {
    try {
        const result = await axios.get(`${baseUrl}/api/reviews?filters[productID][$eq]=${id}`)
        return result?.data?.data
    } catch (error) {
        return rejectWithValue.response.data
    }
  }
);
