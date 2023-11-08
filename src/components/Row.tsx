import { h, VNode } from "preact";

export function Row(props: { children?: VNode | VNode[]; className?: string }): VNode {
  return <div class={`row ${props.className}`}>{props.children}</div>;
}

export default Row;
