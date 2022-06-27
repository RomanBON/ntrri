import { StatusType } from "~/redux/features/generic";

declare global {
    type ErrorType = string | null;

    interface GenericState<T> {
        entities: T;
        loading: StatusType | string;
        error: ErrorType;
        requestId: string | null;
    }
}

export {};
