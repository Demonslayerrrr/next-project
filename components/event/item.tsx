"use client"

import { useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import FormEdit from "./formEdit";

interface EventI {
  _id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  price: number;
}

interface PropsI {
  event: EventI;
  onDelete?: (id: string) => void;
}

export default function Item(props: PropsI) {
  const { event, onDelete } = props;
  const [collapse, setCollapse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [popupState, setPopupState] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.includes('/service/admin');

  const toggle = () => setCollapse(!collapse);


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsDeleting(true);
      try {
        const response = await axios.delete('/api/dashboard/delete-event', {
          data: { eventId: event._id }
        });
        if (response.data.success) {
          onDelete?.(event._id);
        }
      } catch (error) {
        alert('Failed to delete event');
      } finally {
        setIsDeleting(false);
      }
    }
  };


  return (
    <div className="relative py-4 px-2 border border-white rounded-xl mb-2 h-fit flex flex-col">
      {isAdminPage && (
        <div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-2 right-2 cursor-pointer p-2 text-red-400 hover:text-red-500 
                      transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button 
            onClick={() => setPopupState(true)}
            className="cursor-pointer transition-colors duration-200 hover:text-white ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold">{event.name}</h2>
        <h3 className="text-md font-bold">{event.date}</h3>
      </div>
      <button 
        className="w-fit py-2 px-6 rounded border border-white mt-2 cursor-pointer" 
        onClick={toggle}
      >
        Opis
      </button>
      <div className={collapse ? "p-2" : "h-0 overflow-hidden"}>{event.desc}</div>
      {popupState && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="relative w-full max-w-2xl bg-blue-900 rounded-xl shadow-2xl p-6">
                    <button
                      className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors"
                      onClick={() => setPopupState(false)}
                    >
                      <span className="text-2xl">×</span>
                    </button>
                    <FormEdit />
                  </div>
                </div>
      )}
    </div>
  );
}