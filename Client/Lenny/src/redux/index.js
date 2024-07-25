import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categoriesReducer";
import reviewsReducer from "./reducers/reviewsReducer";

export const store = configureStore({
    reducer:{
        categories:categoriesReducer,
        reviews:reviewsReducer
    }
})