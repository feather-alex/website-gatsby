declare module 'react-imgix' {
  import React from 'react';

  interface AttributeConfig {
    src?: string;
    srcSet?: string;
    sizes?: string;
  }

  interface ImgixSourceProps {
    src: string;
    imgixParams?: {};
    sizes?: string;
    className?: string;
    height?: number;
    width?: number;
    disableSrcSet?: boolean;
    disableLibraryParam?: boolean;
    onMounted?: () => void;
    attributeConfig?: AttributeConfig;
    htmlAttributes?: {};
  }

  interface PictureProps {
    className?: string;
    onMounted?: () => void;
    htmlAttributes?: {};
  }

  interface BackgroundProps {
    src: string;
    imgixParams?: {};
    className?: string;
    disableLibraryParam?: boolean;
    htmlAttributes?: {};
  }

  export default class Imgix extends React.Component<ImgixSourceProps> {}

  export class Picture extends React.Component<PictureProps> {}

  export class Background extends React.Component<BackgroundProps> {}
}
