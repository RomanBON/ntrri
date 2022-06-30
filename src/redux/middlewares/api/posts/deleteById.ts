import { AnyAction, Dispatch, MiddlewareAPI } from "redux";

export default ({ getState, dispatch }: MiddlewareAPI, next: Dispatch, action: AnyAction) => {
    next(action);

    const { meta: { arg: { id } } } = action;

    console.log("Deleted post with id:", id);
};
