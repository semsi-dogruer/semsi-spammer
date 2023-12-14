import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

// PUT /api/posts/:postId
export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    // extract the text from the body of the request
    const { text } = await request.json();

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }
    // edit the post on the database using prisma
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { text },
    });
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// DELETE /api/posts/:postId
export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    console.log(post);
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
