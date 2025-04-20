import connect from "@/db";
import Event from "@/models/Event";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
  searchParams: object;
};

export default async function SingleEvent(props: Props) {
  const { params } = props;
  const { slug } = await params;

  let event;

  try {
    await connect();

    event = await Event.findOne({ slug });

    if (!event) {
      return <div><h2>Brak eventu</h2></div>
    }

    console.log(event);
  } catch (error) {}

  return (
    <div>
      <h1>Podstrona Eventu {event.name}</h1>
      <p>Slug eventu: {slug}</p>
      <p>{event.desc}</p>
    </div>
  );
}
