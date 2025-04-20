import Form from "@/components/user/form";
import Link from "next/link";
import List from "@/components/users/list";

export default function Users() {
  return (
    <div>
      <div className="mb-4">
        <Link href={"/service/admin"}>&lt; powrót do admina</Link>
      </div>
      <div>
        <Form />
        <List />
      </div>
    </div>
  );
}
