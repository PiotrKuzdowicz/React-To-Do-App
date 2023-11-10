import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";

interface RowProps {
  children?: VNode | VNode[];
  className?: string;
}

export const Row = (props: RowProps) => {
  return <div class={`row ${props.className}`}>{props.children}</div>;
};

export default Row;
