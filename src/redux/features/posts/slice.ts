import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "~/redux/rootReducer";
import { AppThunk, AppDispatch } from "~/redux/store";
import createGenericSlice from "~/redux/features/generic";
import {I18N, Posts} from "~/api";
import {MiddlewareAPI} from "redux";
import {Languages} from "~/constants";

const initialState: GenericState<PostType[]> = {
    entities: [],
    loading: "posts/idle",
    error: null,
    meta: null,
};

export const get = createAsyncThunk(
    "posts/get",
    async () => {
        return await Posts.get()
            .then(({ data }) => data)
            .catch((error) => error.toString());
    }
);

export const add = createAsyncThunk(
    "posts/add",
    async (data: PostAddType) => {
        return await Posts.add(data)
            .then(({ data }) => data)
            .catch((error) => error.toString());
    }
);

export const deleteById = createAsyncThunk(
    "posts/deleteById",
    async (data: PostDeleteType) => {
        return await Posts.deleteById(data)
            .then(({ data }) => data)
            .catch((error) => error.toString());
    }
);

const postsSlice = createGenericSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [get.pending.type]: (state, action) => {
            state.loading = action.type;
        },
        [get.fulfilled.type]: (state, action) => {
            state.loading = action.type;
            state.entities = action.payload;
        },
        [get.rejected.type]: (state, action) => {
            state.loading = action.type;
            state.error = action.payload || null;
        },
        [add.pending.type]: (state, action) => {
            state.loading = action.type;
            state.meta = action.meta;
        },
        [add.fulfilled.type]: (state, action) => {
            const { requestId } = action.meta;
            const { requestId: stateRequestId } = state.meta || {};

            if (stateRequestId === requestId) {
                state.loading = action.type;
                state.meta = action.meta;
                state.entities.unshift(action.payload);
            }
        },
        [add.rejected.type]: (state, action) => {
            const { requestId } = action.meta;
            const { requestId: stateRequestId } = state.meta || {};

            if (stateRequestId === requestId) {
                state.loading = action.type;
                state.meta = action.meta;
                state.error = action.payload;
            }
        },
        [deleteById.pending.type]: (state, action) => {
            state.loading = action.type;
            state.meta = action.meta;
        },
        [deleteById.fulfilled.type]: (state, action) => {
            const { requestId, arg: { id } } = action.meta;
            const { requestId: stateRequestId } = state.meta || {};

            if (stateRequestId === requestId) {
                state.loading = action.type;
                state.meta = action.meta;
                state.entities = state.entities.filter((post: PostType) => post.id !== id);
            }
        },
        [deleteById.rejected.type]: (state, action) => {
            const { requestId } = action.meta;
            const { requestId: stateRequestId } = state.meta || {};

            if (stateRequestId === requestId) {
                state.loading = action.type;
                state.meta = action.meta;
                state.error = action.payload;
            }
        },
    },
});

// Actions
export const actions = postsSlice.actions;

// Reducer
export default postsSlice.reducer;

// Selectors
export const getPosts = () => (state: RootState) => state.posts.entities;
export const getPostById = ({ id }: PostDeleteType) => (state: RootState) =>
    state.posts.entities.find(post => post.id === id);
export const isPendingAddPost = () => (state: RootState) =>
    state.posts.loading === add.pending.type;
export const isSuccessAddPost = () => (state: RootState) =>
    state.posts.loading === add.fulfilled.type;
export const isPendingDeletePost = ({ id }: PostDeleteType) => (state: RootState) => {
    const { arg } = state.posts?.meta || {};

    return (
        id === arg?.id
        && state.posts.loading === deleteById.pending.type
    );
};
