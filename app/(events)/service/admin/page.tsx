import Link from "next/link";

export default function Admin() {
  const btn_styles = "p-2 border border-white";

  return (
    <div>
      <div className="flex flex-col">
        <h2>Panel admina</h2>
        <div className="flex mt-2">
          <Link href={"/service/admin/users"} className={btn_styles + " mr-2"}>
            Użytkownicy
          </Link>
          <Link href={"/service/admin/events"} className={btn_styles}>
            Edytuj wydarzenie
          </Link>
        </div>
      </div>
    </div>
  );
}
