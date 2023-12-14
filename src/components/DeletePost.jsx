//"use client";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router.js";
import { prisma } from "@/prisma.js";

export default function DeletePost({ posts }) {
  const router = useRouter();

  async function handleDeleteButton(postId) {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    router.refresh();
  }
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className='single-post-container'>
            <div>{post.text}</div>
            <button
              onClick={() => handleDeleteButton(post.id)}
              type='submit'
              className='icon-button'>
              <MdDelete />
            </button>
            <span>{post.likes}</span>
          </div>
        );
      })}
    </div>
  );
}
