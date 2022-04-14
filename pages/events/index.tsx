import Head from "next/head";
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

import { DummyEvents } from "../../helps/types";
import { getAllEvents } from "../../helps/apiUtil";

interface AllEventsPageProps {
  events: DummyEvents[];
};

function AllEventsPage(props: AllEventsPageProps) {
  const router = useRouter();

  const findEventsHandler = (year: number, month: number) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
};



export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}

export default AllEventsPage;
