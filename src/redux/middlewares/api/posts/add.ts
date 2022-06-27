import { AnyAction, Dispatch, MiddlewareAPI } from "redux";

export default ({ getState, dispatch }: MiddlewareAPI, next: Dispatch, action: AnyAction) => {
    next(action);

    const { payload } = action;

    console.log("Added new post with data:", JSON.stringify(payload));
};
