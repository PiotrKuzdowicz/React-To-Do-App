import {
  Attributes,
  Component,
  ComponentChild,
  ComponentChildren,
  Ref,
} from "preact";
import { useLocation } from "preact-iso";

class Header extends Component {
  render(
    props?: Readonly<
      Attributes & { children?: ComponentChildren; ref?: Ref<any> }
    >,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    const { url } = useLocation();

    return (
      <header>
        <nav>
          <a href="/" class={url == "/" && "active"}>
            Home
          </a>
        </nav>
      </header>
    );
  }
}

export default Header;
