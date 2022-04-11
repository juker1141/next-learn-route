import Link from "next/link";
import { ReactNode, MouseEventHandler } from "react";

import classes from "./Button.module.css";

interface ButtonProps {
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

function Button(props: ButtonProps) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={props.onClick}>
        {props.children}
      </button>
    )
  }
};

export default Button;