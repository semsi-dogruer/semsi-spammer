import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export async function GET(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.findFirst({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post found with that id",
      });
    }

    const comments = await prisma.comment.findMany({ where: { postId } });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();
    const newComment = await prisma.comment.create({
      data: {
        text,
        postId,
      },
    });
    return NextResponse.json({
      success: true,
      newComment,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
