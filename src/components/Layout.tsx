import * as React from "react";
import NavBar from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface ILayoutProps {
  variant?: WrapperVariant;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  children,
  variant,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
