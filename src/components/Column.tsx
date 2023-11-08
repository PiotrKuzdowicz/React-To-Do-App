import { h, VNode } from "preact";

interface ColumnProps {
  children?: VNode | VNode[] | VNode[] | string;
  className?: string;
}

export function Column(props: ColumnProps): VNode {

  return <div class={`col ${props.className}`}>{props.children}</div>;
}


export default Column;