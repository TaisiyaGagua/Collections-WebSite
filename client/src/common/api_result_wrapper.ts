export type ApiResultWrapper<T> = {
    data: T | undefined;
    error: string | undefined;
};
