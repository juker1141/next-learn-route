import { DummyEvents } from "./types";

export const getAllEvents = async () => {
  const res = await fetch("https://nextjs-course-2b91c-default-rtdb.firebaseio.com/events.json");
  const data = await res.json();

  const events: DummyEvents[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents: DummyEvents[] = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const allEvents: DummyEvents[] = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents =
  async (dateFilter: {year: number, month: number}) => {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
  };
