// Types for Flux Standard Actions
// https://github.com/redux-utilities/flux-standard-action

type FluxStandardActionPayload<T> = T extends undefined
  ? { payload?: T }
  : { payload: T };

interface FluxStandardActionMeta<T> {
  type: T;
  error?: boolean;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FluxStandardAction<
  T = string,
  U = any
> = FluxStandardActionMeta<T> & FluxStandardActionPayload<U>;

export type ActionCreator<T = FluxStandardAction> = () => T;
