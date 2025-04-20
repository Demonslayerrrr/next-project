import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import User from "@/models/User";

type ResponseData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { user } = data;

  try {
    await connect();

    await User.create(user);

    return NextResponse.json<ResponseData>({ success: true });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
