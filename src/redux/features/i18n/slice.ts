import { createAsyncThunk } from "@reduxjs/toolkit";
import { MiddlewareAPI } from "redux";

import { I18N } from "~/api";
import { Languages } from "~/constants";
import createGenericSlice from "~/redux/features/generic";
import { RootState } from "~/redux/rootReducer";

export const supportedLanguages = {
    [Languages.EN]: "English",
    [Languages.DE]: "Deutsche",
};

interface I18NStateType {
    language: Languages;
    supportedLanguages: typeof supportedLanguages;
    translations: {
        [key: string]: any;
    };
}

type GetTranslationsType = {
    language?: Languages;
} | undefined;

const initialState: GenericState<I18NStateType> = {
    entities: {
        language: Languages.EN,
        supportedLanguages,
        translations: {},
    },
    loading: "i18n/idle",
    error: null,
    meta: null,
};

export const get = createAsyncThunk(
    "i18n/get",
    async (params: GetTranslationsType, { getState, dispatch }: MiddlewareAPI) => {
        const resolvedLanguage: Languages = params?.language || getState().i18n.entities.language;

        dispatch(actions.setLanguage(resolvedLanguage));

        return await I18N.get(resolvedLanguage)
            .then(({ data }) => data)
            .catch((error) => error.toString());
    }
);

const i18nSlice = createGenericSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.entities.language = action.payload;
        },
    },
    extraReducers: {
        [get.pending.type]: (state, action) => {
            state.loading = action.type;
            state.meta = action.meta;
        },
        [get.fulfilled.type]: (state, action) => {
            state.loading = action.type;
            state.meta = action.meta;
            state.entities.translations = action.payload;
        },
        [get.rejected.type]: (state, action) => {
            state.loading = action.type;
            state.meta = action.meta;
            state.error = action.payload || null;
        },
    },
});

// Actions
export const actions = i18nSlice.actions;

// Reducer
export default i18nSlice.reducer;

// Selectors
export const translations = () => (state: RootState) =>
    state.i18n.entities.translations || {};
export const getSupportedLanguages = () => (state: RootState) =>
    state.i18n.entities.supportedLanguages;
