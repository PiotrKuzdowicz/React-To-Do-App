import { Component, ComponentChild, h, RenderableProps, VNode } from "preact"; // Make sure to import 'h' from Preact

interface ContainerProps {
  children?: VNode | VNode[];
  className?: string;
}

class Container extends Component<ContainerProps> {
  render(
    props?: RenderableProps<ContainerProps, any>,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    return <div class={`container ${props.className}`}>{props.children}</div>;
  }
}

export default Container;
