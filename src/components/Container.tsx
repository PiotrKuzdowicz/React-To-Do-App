import { h, VNode } from "preact"; // Make sure to import 'h' from Preact

export function Container(props: { children?: VNode[] |VNode }): VNode {
  return <div class="container">{props.children}</div>; 
}

export default Container;
