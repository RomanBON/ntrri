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
import { diff } from "jsondiffpatch";

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
        fulfilled(state: GenericState<P>, action: PayloadAction<P>) {
            state.loading = action.type;
            state.entities = action.payload;
        },
        rejected(state: GenericState<P>, action: PayloadAction<ErrorType>) {
            state.loading = action.type;
            state.error = action.payload;
        },
        ...reducers,
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const stateDiff = diff(state, action.payload[name]);
            const isStateSuccess = stateDiff?.loading?.[0]?.endsWith("fulfilled");
            const isPayloadSuccess = stateDiff?.loading?.[1]?.endsWith("fulfilled");

            return {
                ...state, // use previous state
                ...action.payload[name], // apply delta from hydration
                ...(isStateSuccess && state),
                ...(isPayloadSuccess && action.payload[name]),
            };
        },
        ...extraReducers,
    },
});

export default createGenericSlice;
