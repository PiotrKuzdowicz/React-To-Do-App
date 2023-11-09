import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";

interface ColumnProps {
  children?: VNode | VNode[] | VNode[] | string;
  className?: string;
}

class Column extends Component<ColumnProps>{

  render(props?: RenderableProps<ColumnProps, any>, state?: Readonly<{}>, context?: any): ComponentChild {
      return <div class={`col ${props.className}`}>{props.children}</div>;
  }
}

export default Column;