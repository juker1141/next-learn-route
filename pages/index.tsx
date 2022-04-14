import type { GetStaticProps, NextPage } from 'next';
import { getFeaturedEvents } from '../helps/apiUtil';
import { DummyEvents } from '../helps/types';
import EventList from '../components/events/EventList';
import Head from "next/head";


interface HomePageProps {
  events: DummyEvents[];
};

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage;
