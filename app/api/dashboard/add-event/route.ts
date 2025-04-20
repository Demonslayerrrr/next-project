import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Event from "@/models/Event";

type ResponseData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { event } = data;

  console.log(event);

  try {
    await connect();

    await Event.create(event);

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    console.log(error)
    return NextResponse.json<ResponseData>({ success: false });
  }
}
