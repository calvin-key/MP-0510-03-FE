import { EventData } from "@/utils/eventData";

// This would typically be replaced with an API call or database interaction
let events: EventData[] = [];

export const addEvent = (event: EventData) => {
  events.push(event);
};

export const getEvents = (): EventData[] => {
  return events;
};

export const getEventsByYear = (year: number): EventData[] => {
  return events.filter((event) => new Date(event.date).getFullYear() === year);
};

export const getEventsByMonth = (year: number, month: number): EventData[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};

export const getEventsByDay = (
  year: number,
  month: number,
  day: number,
): EventData[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month &&
      eventDate.getDate() === day
    );
  });
};
