export type QueryResultCallback<T = any, R = void> = (
  err: string | null,
  data?: T
) => R;
