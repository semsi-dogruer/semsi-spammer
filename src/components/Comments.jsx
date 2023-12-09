"use client";
import { useRouter } from "next/navigation.js";
import API_URL from "@/lib/API-URL.js";
import { useState, useEffect } from "react";

export function Comments({ id, counter }) {
  const [comment, setComment] = useState();
  const router = useRouter();

  async function fetchComments() {
    const res = await fetch(`${API_URL}/api/posts/${id}/comments`);
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
