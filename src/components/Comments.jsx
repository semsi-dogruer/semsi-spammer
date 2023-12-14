"use client";
import { useRouter } from "next/navigation.js";

import { useState, useEffect } from "react";

export function Comments({ id, counter }) {
  const [comment, setComment] = useState();
  const router = useRouter();

  async function fetchComments() {
    const res = await fetch(`/api/posts/${id}/comments`, { cache: "no-store" });
    const result = await res.json();
    setComment(result.comments);
  }

  useEffect(() => {
    fetchComments();
  }, [counter]);

  return (
    <div>
      <ul>
        {comment && comment.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}
