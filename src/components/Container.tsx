import { Component, ComponentChild, h, RenderableProps, VNode } from "preact"; // Make sure to import 'h' from Preact

interface ContainerProps {
  children?: VNode | VNode[];
  className?: string;
}

export const Container = (props: ContainerProps) => {
  return <div class={`container ${props.className}`}>{props.children}</div>;
};

export default Container;