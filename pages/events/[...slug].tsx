import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";

import { getFilteredEvents } from "../../helps/apiUtil";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { GetServerSideProps } from "next";
import { DummyEvents } from "../../helps/types";

// interface FilterEventsPageProps {
//   hasError?: boolean;
//   events?: DummyEvents[];
//   date?: {year: number, month: number};
// }

const FilterEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<DummyEvents[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR("https://nextjs-course-2b91c-default-rtdb.firebaseio.com/events.json", (url) => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (data) {
      const events: DummyEvents[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }

      setLoadedEvents(events)
    }
  }, [data]);

  if (!loadedEvents || !filterData) {
    return <p className="center">Loading...</p>;
  }

  const filterYear = parseInt(filterData[0], 10);
  const filterMonth = parseInt(filterData[1], 10);

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${filterMonth}/${filterYear}.`} />
    </Head>
  )

  if (isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth > 12 ||
    filterMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter, Please adject your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  };

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === filterYear && eventDate.getMonth() === filterMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;

//   const filterData = params?.slug;

//   let events;
//   let date;

//   if (filterData) {
//     const filterYear = parseInt(filterData[0], 10);
//     const filterMonth = parseInt(filterData[1], 10);

//     if (isNaN(filterYear) ||
//       isNaN(filterMonth) ||
//       filterYear > 2030 ||
//       filterYear < 2021 ||
//       filterMonth > 12 ||
//       filterMonth < 1
//     ) {
//       return {
//         props: {
//           hasError: true,
//         },
//         // notFound: true,
//         // redirect: {
//         //   destination: "/error"
//         // }
//       }
//     }
//     date = {
//       year: filterYear,
//       month: filterMonth, 
//     };

//     events = await getFilteredEvents({
//       year: filterYear,
//       month: filterMonth,
//     });
//   }

//   return {
//     props: {
//       events,
//       date,
//     }
//   }
// }

export default FilterEventsPage;
