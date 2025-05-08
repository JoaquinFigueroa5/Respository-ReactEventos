'use client';

import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { eventsReducer, initialState } from "../components/reducer/useReducer";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, dispatch] = useReducer(eventsReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    dispatch({ type: "load", payload: storedEvents });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events, isInitialized]);

  return (
    <EventsContext.Provider value={{ events, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
