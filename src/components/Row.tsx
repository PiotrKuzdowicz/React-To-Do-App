import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";

interface RowProps {
  children?: VNode | VNode[];
  className?: string;
}

class Row extends Component<RowProps> {
  render(
    props?: RenderableProps<RowProps, any>,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    return <div class={`row ${props.className}`}>{props.children}</div>;
  }
}

export default Row;
