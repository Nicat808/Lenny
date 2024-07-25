import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../helpers";
export const getCategories=createAsyncThunk("categories/fetchCategories",async()=>{
    try {
        const res = await axios.get(`${baseUrl}/api/categories?populate=*`)
        return res?.data?.data
    } catch (error) {
        console.log(error);
    }
})