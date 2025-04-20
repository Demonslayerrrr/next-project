"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Item from "@/components/event/item";
import Form from "@/components/event/form";
import Image from "next/image";
import Plus from "@/public/plus.svg";

interface EventI {
  _id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  price: number;
  city: string;
}

interface CityI {
  _id: string;
  name: string;
}

export default function Dashboard() {
  const [popupState, setPopupState] = useState(false);
  const [cities, setCities] = useState<CityI[]>([]);
  const [events, setEvents] = useState<EventI[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, citiesRes] = await Promise.all([
          axios.get("/api/home/get-events"),
          axios.get("/api/home/get-cities")
        ]);
        setEvents(eventsRes.data.events);
        setCities(citiesRes.data.cities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEventDelete = (deletedEventId: string) => {
    setEvents(events.filter(event => event._id !== deletedEventId));
  };

  const filteredEvents = selectedCity === "all" 
    ? events 
    : events.filter(event => event.city === selectedCity);

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-blue-900/50 p-4 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-4">Filter by City</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCity("all")}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCity === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-800 text-blue-200 hover:bg-blue-700"
              }`}
            >
              All Cities
            </button>
            {cities.map((city) => (
              <button
                key={city._id}
                onClick={() => setSelectedCity(city._id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCity === city._id
                    ? "bg-blue-500 text-white"
                    : "bg-blue-800 text-blue-200 hover:bg-blue-700"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Item 
              key={event._id} 
              event={event} 
              onDelete={handleEventDelete}
            />
          ))}
        </div>

        <button
          onClick={() => setPopupState(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg transition-all duration-200 group"
        >
          <Image 
            src={Plus} 
            alt="add icon" 
            width={40} 
            height={40} 
            className="transform group-hover:rotate-90 transition-transform duration-200" 
          />
        </button>

        {popupState && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="relative w-full max-w-2xl bg-blue-900 rounded-xl shadow-2xl p-6">
              <button
                className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors"
                onClick={() => setPopupState(false)}
              >
                <span className="text-2xl">×</span>
              </button>
              <Form />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}