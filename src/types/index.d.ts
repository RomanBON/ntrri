import { StatusType } from "~/redux/features/generic";

declare global {
    type ErrorType = string | null;
    type MetaType = {
        arg: {
            [key: string]: any;
        };
        requestId: string;
    };

    interface GenericState<T> {
        entities: T;
        loading: StatusType | string;
        error: ErrorType;
        meta: MetaType | null;
    }
}

export {};
