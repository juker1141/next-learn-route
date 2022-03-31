import { Fragment, ReactChild, ReactChildren } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

function Layout(props: LayoutProps) {
  return(
    <Fragment>
      <Header />
      <main>
        {props.children}
      </main>
    </Fragment>
  )
};

export default Layout;