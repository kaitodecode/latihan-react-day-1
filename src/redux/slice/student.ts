import type { Student, StudentFormData } from "@/features/students _redux/controller"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

export const fetchStudents = createAsyncThunk(
    "student/fetch",
    async () => {
        const res = await axios.get("http://localhost:5042/api/Student/")
        return res.data
    }
)

export const addStudent = createAsyncThunk(
    "student/add",
    async (newData: StudentFormData) => {
        const res = await axios.post(
            "http://localhost:5042/api/Student/",
            newData
        );
        return res.data;
    }
);

export const updateStudent = createAsyncThunk(
    "student/update",
    async (payload: { id: string; updatedData: StudentFormData }) => {
        const res = await axios.put(
            `http://localhost:5042/api/Student/${payload.id}`,
            payload.updatedData
        );
        // Pastikan data yang dikembalikan memiliki ID
        return { ...res.data, id: payload.id };
    }
);


export const deleteStudent = createAsyncThunk(
    "student/delete",
    async (id: string) => {
        await axios.delete(
            `http://localhost:5042/api/Student/${id}`
        );
        return id; // kembalikan id agar bisa difilter di state
    }
);


const studentSlice = createSlice({
    name: "student",
    initialState: {
        list: [] as Student[],
        loading: false,
        error: null as null | string,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                // Pastikan state.list selalu mendapatkan array baru
                state.list = [...action.payload];
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            // POST
            .addCase(addStudent.fulfilled, (state, action) => {
                // Buat array baru untuk memastikan perubahan terdeteksi
                state.list = [...state.list, action.payload as Student];
            })
            // PUT
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (mhs) => mhs.id === action.payload.id
                );
                if (index !== -1) {
                    // Buat array baru untuk memastikan perubahan terdeteksi
                    const newList = [...state.list];
                    newList[index] = action.payload as Student;
                    state.list = newList;
                }
            })
            // DELETE
            .addCase(deleteStudent.fulfilled, (state, action) => {
                // Buat array baru untuk memastikan perubahan terdeteksi
                state.list = state.list.filter((mhs) => mhs.id !== action.payload);
            });
    },
});

export default studentSlice.reducer;
