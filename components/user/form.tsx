"use client";

import { FormEvent } from "react";
import UserI from "@/types/user";
import axios from "axios";

export default function Form() {
  const input_form = "p-2 border border-white mb-2 outline-none";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form[0] as HTMLInputElement).value;
    const email = (form[1] as HTMLInputElement).value;
    const password = (form[2] as HTMLInputElement).value;

    const user: UserI = { name, email, password };

    const response = await axios.post("/api/admin/add-user", { user });

    if (response.data.success) window.location.reload();
  };

  return (
    <div>
      <form className="flex flex-col max-w-[400px]" onSubmit={submit}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className={input_form}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={input_form}
          required
        />
        <input
          type="text"
          placeholder="Hasło"
          className={input_form}
          required
        />
        <button
          type="submit"
          className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-700"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
}
