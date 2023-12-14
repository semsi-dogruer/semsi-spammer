"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function EditBox({ text, id, setId }) {
  const [editedText, setEditedText] = useState(text);
  const router = useRouter();

  function handleChange(e) {
    setEditedText(e.target.value);
  }
  function handleCancelButton(e) {
    setId("");
  }

  async function handleEdit() {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: editedText,
      }),
      cache: "no-store",
    });
    setId(""); //clears the input after submit
    router.refresh();
  }

  return (
    <div>
      <input type='text' onChange={handleChange} value={editedText} />
      <button onClick={handleEdit}>Edit Post</button>
      <button onClick={handleCancelButton}>Cancel</button>
    </div>
  );
}

//editedText what the user have typed
