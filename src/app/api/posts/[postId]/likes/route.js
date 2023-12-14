import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const likes = await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      likes,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
