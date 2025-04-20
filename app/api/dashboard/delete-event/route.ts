import connect from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";

type ResponseData = {
    success: boolean;
  };

export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const data = await request.json();
    const eventId = data.eventId;
    
    const event = await Event.findByIdAndDelete(eventId);
    
    if (!event) {
      return NextResponse.json<ResponseData>({ success: false });
    }
    
    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json<ResponseData>({ success: false });
  }
}