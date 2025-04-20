"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface CityI {
  _id: string;
  name: string;
}

export default function FormEdit() {
  const [cities, setCities] = useState<CityI[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/home/get-cities");
        setCities(response.data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const input_form = `
    w-full
    px-4
    py-2.5
    bg-blue-900/50
    border
    border-blue-700
    rounded-lg
    mb-2
    text-white
    placeholder-blue-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500
    focus:outline-none
    transition-all
    duration-200
  `;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const event: any = {
      name: (form[0] as HTMLInputElement).value !== null ? (form[0] as HTMLInputElement).value : undefined,
      desc: (form[1] as HTMLInputElement).value !== null ? (form[1] as HTMLInputElement).value : undefined,
      date: (form[2] as HTMLInputElement).value !== null ? (form[2] as HTMLInputElement).value : undefined,
      url: (form[4] as HTMLInputElement).value !== null ? (form[4] as HTMLInputElement).value : undefined,
      price: (form[5] as HTMLInputElement).value !== null ? (form[5] as HTMLInputElement).value : undefined,
      city: (form[3] as HTMLSelectElement).value !== null ? (form[3] as HTMLInputElement).value : undefined
    };

    try {
      const res = await axios.patch("/api/dashboard/patch-event", { event });
      if (res.data.success) {
        form.reset();
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="w-full bg-blue-950 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">
        Zmień Event
      </h2>
      
      <form className="space-y-3" onSubmit={submit}>
        <div>
          <label className="text-sm font-medium text-blue-200 mb-1 block">
            Nazwa Eventu
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            className={input_form}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-200 mb-1 block">
            Opis
          </label>
          <textarea 
            placeholder="Enter event description"
            className={`${input_form} min-h-[100px] max-h-[200px] resize-y`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">
              Data
            </label>
            <input 
              type="date" 
              className={`${input_form} cursor-pointer`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">
              Miasto
            </label>
            <select 
              className={input_form}
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-blue-200 mb-1 block">
            Event URL
          </label>
          <input
            type="url"
            className={input_form}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-blue-200 mb-1 block">
            Cena
          </label>
          <input 
            type="number" 
            className={input_form}
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                   shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900"
        >
          Zmień Wydarzenie
        </button>
      </form>
    </div>
  );
}