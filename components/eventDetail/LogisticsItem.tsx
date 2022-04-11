import { ReactNode } from "react";
import classes from './LogisticsItem.module.css';

interface LogisticsItemProps {
  icon(): JSX.Element;
  children: ReactNode;
};

function LogisticsItem(props: LogisticsItemProps) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        {props.icon()}
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export default LogisticsItem;
