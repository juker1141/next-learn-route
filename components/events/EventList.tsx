import { DummyEvents } from "../../dummy-data";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";

interface EventListProps {
  items: DummyEvents[],
};

function EventList(props: EventListProps) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => <EventItem key={event.id} {...event} />)}
    </ul>
  );
};

export default EventList;