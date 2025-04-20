import connect from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";

type ResponseData = {
  success: boolean;
  message?: string;
};

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();

    const { id } = params;

    const updatedData = await request.json();

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json<ResponseData>({ success: false });
    }

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] !== undefined) {
        event[key] = updatedData[key]; 
      }
    });

    await event.save();

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json<ResponseData>({ success: false });
  }
}
