import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import createGenericSlice from "~/redux/features/generic";
import { RootState } from "~/redux/rootReducer";
import { Users } from "~/api";

export const get = createAsyncThunk(
    "users/get",
    async () => {
        return await Users.get().then(({ data }) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
    }
);

const initialState: GenericState<UserType[]> = {
    entities: [],
    loading: "users/idle",
    error: null,
    requestId: null,
};

const usersSlice = createGenericSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [get.pending.type]: (state, action) => {
            state.loading = action.type;
        },
        [get.fulfilled.type]: (state, action: PayloadAction<UserType[]>) => {
            state.loading = action.type;
            state.entities = action.payload;
        },
        [get.rejected.type]: (state, action: PayloadAction<ErrorType>) => {
            state.loading = action.type;
            state.error = action.payload;
        },
    },
});

// Reducer
export default usersSlice.reducer;

// Selectors
export const getUsers = () => (state: RootState) => state.users.entities;
export const isSuccessFetchUsers = () => (state: RootState) =>
    state.users.loading === get.fulfilled.type;
