import connect from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";

type ResponseData = {
  success: boolean;
  message?: string;
};

export async function PATCH(request: NextRequest) {
  try {
    await connect();

    const { event } = await request.json();

    if (!event || !event._id) {
      return NextResponse.json<ResponseData>({ success: false, message: "Missing event or event._id" });
    }

    const existingEvent = await Event.findById(event._id);

    if (!existingEvent) {
      return NextResponse.json<ResponseData>({ success: false, message: "Event not found" });
    }

    Object.entries(event).forEach(([key, value]) => {
      if (key !== "_id") {
        existingEvent[key] = value;
      }
    });

    await existingEvent.save();

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json<ResponseData>({ success: false, message: "Server error" });
  }
}
