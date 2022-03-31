import { ReactChild, ReactChildren } from "react";
import classes from './LogisticsItem.module.css';

interface LogisticsItemProps {
  icon(): JSX.Element;
  children: ReactChild | ReactChildren;
};

function LogisticsItem(props: LogisticsItemProps) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        {Icon()}
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export default LogisticsItem;
