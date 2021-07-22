declare module "react-image" {
  import React from "react";

  interface Props {
    src: string[];
    decode?: boolean;
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader?: any;
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    unloader?: any;
  }

  export default class Img extends React.Component<Props> {}
}
