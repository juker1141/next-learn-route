import { Fragment, ReactNode } from "react";
import AppHeader from "./Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return(
    <Fragment>
      <AppHeader />
      <main>
        {props.children}
      </main>
    </Fragment>
  )
};

export default Layout;