import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import EventContent from "../../components/eventDetail/EventContent";

function EventDetailPage() {
  const router = useRouter();

  const { eventId } = router.query;
  if (typeof eventId === 'string') {
    const event = getEventById(eventId);
    if (!event) {
      return <p>No event found!</p>
    }

    return (
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    );
  }
};

export default EventDetailPage;
