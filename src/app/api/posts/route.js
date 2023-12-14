import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export async function GET() {
  // use prisma to get all the posts from the DB
  const posts = await prisma.post.findMany();
  return NextResponse.json({ success: true, posts });
}

export async function POST(request, response) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must enter a valid message",
      });
    }
    const post = await prisma.post.create({ data: { text } });
    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
