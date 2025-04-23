import Link from "next/link";

export default function Admin() {
  const btn_styles =
    "px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold shadow-lg transition-all duration-200 w-full sm:w-auto";

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl text-white-900 mb-8 tracking-wide drop-shadow-lg text-center">
        Panel admina
      </h2>
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-32 mb-10 w-full max-w-2xl justify-center">
        <div className="flex flex-col items-center w-full sm:w-auto">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M50 10 L10 50"
              stroke="#2563eb"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M10 50 L20 52 M10 50 L12 40"
              stroke="#2563eb"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div className="mt-10" />
          <Link href="/service/admin/users" className={btn_styles}>
            Użytkownicy
          </Link>
        </div>
        <div className="flex flex-col items-center w-full sm:w-auto">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M10 10 L50 50"
              stroke="#2563eb"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M50 50 L40 52 M50 50 L48 40"
              stroke="#2563eb"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div className="mt-10" />
          <Link href="/service/admin/events" className={btn_styles}>
            Edytuj wydarzenie
          </Link>
        </div>
      </div>
    </div>
  );
}