import { combineReducers } from "@reduxjs/toolkit";

import { posts, users } from "~/redux/features";

const rootReducer = combineReducers({
    posts: posts.reducer,
    users: users.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
