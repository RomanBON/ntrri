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
        loading: string;
        error: ErrorType;
        meta: MetaType | null;
    }
}

export {};
