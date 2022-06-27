import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    ActionReducerMapBuilder,
    PayloadAction,
    CaseReducers,
} from "@reduxjs/toolkit";
import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";
import { HYDRATE } from "next-redux-wrapper";

const createGenericSlice = <P, Reducers extends SliceCaseReducers<GenericState<P>>>({
    name = "",
    initialState,
    reducers,
    extraReducers,
}: {
    name: string,
    initialState: GenericState<P>,
    reducers: ValidateSliceCaseReducers<GenericState<P>, Reducers>,
    extraReducers?: CaseReducers<NoInfer<GenericState<P>>, any> | ((builder: ActionReducerMapBuilder<NoInfer<GenericState<P>>>) => void)
}) => createSlice({
    name,
    initialState,
    reducers: {
        success(state: GenericState<P>, action: PayloadAction<P>) {
            state.loading = action.type;
            state.entities = action.payload;
        },
        fail(state: GenericState<P>, action: PayloadAction<ErrorType>) {
            state.loading = action.type;
            state.error = action.payload;
        },
        ...reducers,
    },
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state,
            ...action.payload[name],
        }),
        ...extraReducers,
    },
});

export default createGenericSlice;
