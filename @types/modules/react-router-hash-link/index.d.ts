declare module "react-router-hash-link" {
  import React from "react";

  interface HashEl {
    scrollIntoView: Function;
  }
  interface Props {
    to: string;
    className?: string;
    smooth?: boolean;
    scroll?: (el: HashEl) => void; // explicit
  }
  export class HashLink extends React.Component<Props> {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Props & { children?: any };
  }
}
