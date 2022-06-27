import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

import rootReducer, { RootState } from "~/redux/rootReducer";
import { apiMiddleware } from "~/redux/middlewares";

const middlewares = [
    apiMiddleware,
];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore);
