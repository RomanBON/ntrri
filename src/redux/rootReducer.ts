import { combineReducers } from "@reduxjs/toolkit";

import { i18n, posts, users } from "~/redux/features";

const rootReducer = combineReducers({
    i18n: i18n.reducer,
    posts: posts.reducer,
    users: users.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
