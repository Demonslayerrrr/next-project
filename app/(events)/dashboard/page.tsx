"use client";
import Form from "@/components/event/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "@/components/event/item";

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

export default function Events() {
  const [cities, setCities] = useState<CityI[]>([]);
  const [events, setEvents] = useState<EventI[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, citiesRes] = await Promise.all([
          axios.get("/api/home/get-events"),
          axios.get("/api/home/get-cities")
        ]);
        setCities(citiesRes.data.cities);
        setEvents(eventsRes.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredEvents = selectedCity === "all" ? events : events.filter(event => event.city === selectedCity);

  if (isLoading) return <div className="min-h-screen bg-blue-950 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        {showForm && <div className="mb-8"><Form /></div>}
        <div className="mb-8 bg-blue-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Filter by City</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCity("all")} className={`px-4 py-2 rounded-full transition-colors ${selectedCity === "all" ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}`}>
              Wszystkie miasta
            </button>
            {cities.map((city) => (
              <button key={city._id} onClick={() => setSelectedCity(city._id)} className={`px-4 py-2 rounded-full transition-colors ${selectedCity === city._id ? "bg-blue-500 text-white" : "bg-blue-800 text-blue-200 hover:bg-blue-700"}`}>
                {city.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <Item key={event._id} event={event} />)
          ) : (
            <div className="col-span-full text-center text-white text-lg">Brak eventów</div>
          )}
        </div>
      </div>
    </div>
  );
}