"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditComments({ id, setCommentVisible, setCounter }) {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  //this is to check if comment is in edit box
  async function handleComment() {
    if (commentText.length == 0) {
      alert("enter text to submit");
      return;
    }
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
      }),
      cache: "no-store",
    });
    if (response.ok) {
      setCounter((prevCounter) => prevCounter + 1);
      setCommentVisible(""); //make comment box disappear
      setCommentText(""); //reset the comment text
      router.refresh();
    }
  }

  const handleCancel = () => {
    setCommentVisible("");
    setCommentText("");
  };

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
      />
      <button onClick={handleComment}>comment</button>
      <button onClick={handleCancel}>cancel</button>
    </div>
  );
}
