import { Component, ComponentChild, h, RenderableProps, VNode } from "preact";

interface ColumnProps {
  children?: VNode | VNode[] | VNode[] | string;
  className?: string;
}

export const Column = (props: ColumnProps) => {
  return <div class={`col ${props.className}`}>{props.children}</div>;
};


export default Column;