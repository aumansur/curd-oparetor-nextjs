import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic created" }, { status: 201 });
};

export const GET = async (req) => {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 201 });
};

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: " Topic deleted" }, { status: 200 });
};
