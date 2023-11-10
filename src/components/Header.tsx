import {
  Attributes,
  Component,
  ComponentChild,
  ComponentChildren,
  Ref,
} from "preact";
import { useLocation } from "preact-iso";

export const Header = () => {
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
};

export default Header;
