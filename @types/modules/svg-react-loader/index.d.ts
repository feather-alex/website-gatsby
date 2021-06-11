declare module '*.svg' {
  const content: string;

  export default class SvgReactLoader extends React.Component<React.HTMLProps<SVGElement | HTMLDivElement>> {}
}
