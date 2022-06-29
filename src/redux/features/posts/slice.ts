import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "~/redux/rootReducer";
import { AppThunk, AppDispatch } from "~/redux/store";
import createGenericSlice from "~/redux/features/generic";
import { Posts } from "~/api";
import generateId from "~/utils/generateId";

const initialState: GenericState<PostType[]> = {
    entities: [],
    loading: "posts/idle",
    error: null,
    meta: null,
};

// Action for SSR store use
export const get = (): AppThunk => async (dispatch: AppDispatch) => {
    await Posts.get()
        .then(({ data }) => {
            dispatch(actions.success(data));
        })
        .catch((error) => {
            throw dispatch(actions.fail(error.toString()));
        });
};

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
                // id obtained from the response is always the same, so in this case we generate our own
                const updatedData = { ...action.payload, id: generateId() };
                state.entities.unshift(updatedData);
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
    const { arg } = state.posts.meta || {};

    return (
        id === arg?.id
        && state.posts.loading === deleteById.pending.type
    );
};
