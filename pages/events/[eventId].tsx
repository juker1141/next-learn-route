import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helps/apiUtil";

import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import EventContent from "../../components/eventDetail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { DummyEvents } from "../../helps/types";

interface EventDetailPageProps {
  selectedEvent: DummyEvents;
}

const EventDetailPage = (props: EventDetailPageProps) => {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context?.params?.eventId;

  let event;

  // type guard
  if (typeof eventId === "string") {
    event = await getEventById(eventId);
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id
    }
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
