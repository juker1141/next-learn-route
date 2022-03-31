import { ReactChild, ReactChildren } from "react";
import classes from './EventContent.module.css';

interface EventContentProps {
  children: ReactChild | ReactChildren;
};

function EventContent(props: EventContentProps) {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default EventContent;
