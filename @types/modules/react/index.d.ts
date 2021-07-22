import React from "react";

declare module "react" {
  interface Component<P, S, SS> extends React.ComponentLifecycle<P, S, SS> {
    setState<K extends keyof S>(
      state:
        | ((
            prevState: Readonly<S>,
            props: Readonly<P>
          ) => Partial<Pick<S, K>> | S | null)
        | (Partial<Pick<S, K>> | S | null),
      callback?: () => void
    ): void;
  }
}
