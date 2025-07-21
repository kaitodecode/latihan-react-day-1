import type { Trainer, TrainerFormData } from "@/features/trainer_redux/controller"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

export const fetchTrainer = createAsyncThunk(
    "trainer/fetch",
    async () => {
        const res = await axios.get("http://localhost:5042/api/Trainer/")
        return res.data
    }
)

export const addtrainer = createAsyncThunk(
    "trainer/add",
    async (newData: TrainerFormData) => {
        const res = await axios.post(
            "http://localhost:5042/api/Trainer/",
            newData
        );
        return res.data;
    }
);

export const updatetrainer = createAsyncThunk(
    "trainer/update",
    async (payload: { id: string; updatedData: TrainerFormData }) => {
        const res = await axios.put(
            `http://localhost:5042/api/Trainer/${payload.id}`,
            payload.updatedData
        );
        // Pastikan data yang dikembalikan memiliki ID
        return { ...res.data, id: payload.id };
    }
);


export const deletetrainer = createAsyncThunk(
    "trainer/delete",
    async (id: string) => {
        await axios.delete(
            `http://localhost:5042/api/Trainer/${id}`
        );
        // Kembalikan id dengan tipe yang konsisten
        return id;
    }
);


const trainerSlice = createSlice({
    name: "trainer",
    initialState: {
        list: [] as Trainer[],
        loading: false,
        error: null as null | string,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchTrainer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainer.fulfilled, (state, action) => {
                state.loading = false;
                // Pastikan state.list selalu mendapatkan array baru
                state.list = [...action.payload];
            })
            .addCase(fetchTrainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            // POST
            .addCase(addtrainer.fulfilled, (state, action) => {
                // Buat array baru untuk memastikan perubahan terdeteksi
                state.list = [...state.list, action.payload as Trainer];
            })
            // PUT
            .addCase(updatetrainer.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (mhs) => mhs.id === action.payload.id
                );
                if (index !== -1) {
                    // Buat array baru untuk memastikan perubahan terdeteksi
                    const newList = [...state.list];
                    newList[index] = action.payload as Trainer;
                    state.list = newList;
                }
            })
            // DELETE
            .addCase(deletetrainer.fulfilled, (state, action) => {
                // Buat array baru untuk memastikan perubahan terdeteksi
                state.list = state.list.filter((mhs) => mhs.id !== action.payload);
            });
    },
});

export default trainerSlice.reducer;
