import { MiddlewareAPI, AnyAction, Dispatch } from "redux";

import { posts } from "~/redux/features";

import addPostMiddleware from "./add";

export default (store: MiddlewareAPI, next: Dispatch, action: AnyAction) => {
    switch (action.type) {
        case posts.slice.add.fulfilled.type:
            return addPostMiddleware(store, next, action);

        default: {
            next(action);
        }
    }
};
