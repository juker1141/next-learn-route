import Link from "next/link";
import { ReactChild, ReactChildren } from "react";

import classes from "./Button.module.css";

interface ButtonProps {
  link: string,
  children: ReactChild | ReactChildren,
};

function Button(props: ButtonProps) {
  return (
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
};

export default Button;