import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

export const loginAuth = createAsyncThunk<any, string>(
    "auth/login",
    async(nim, thunkApi)=> {
        try {
            const res = await axios.get("http://localhost:5042/api/Student/login/" + nim)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue("NIM tidak ditemukan")
        }
    }
)

const authSlice = createSlice({
    name: "Auth",
    initialState: {
        user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
        isLoading: false,
        error: null as string | null
    },
    reducers : {
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem("user")
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginAuth.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginAuth.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            
            localStorage.setItem("user", JSON.stringify(action.payload))
        })
        .addCase(loginAuth.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;
