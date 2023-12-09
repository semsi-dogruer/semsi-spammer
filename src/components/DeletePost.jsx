//"use client";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router.js";
import API_URL from "@/lib/API-URL.js";

export default function DeletePost({ posts }) {
  const router = useRouter();

  async function handleDeleteButton() {
    const response = await fetch(`${API_URL}/api/posts/${posts.id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const info = await response.json();
    router.refresh();
  }
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="single-post-container">
            <div>{post.text}</div>
            <button
              onClick={() => handleDeleteButton(post.id)}
              type="submit"
              className="icon-button"
            >
              <MdDelete />
            </button>
            <span>{post.likes}</span>
          </div>
        );
      })}
    </div>
  );
}
