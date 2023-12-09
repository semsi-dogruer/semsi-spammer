"use client";

import API_URL from "@/lib/API-URL.js";

//Component to create a new post
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function NewMessage() {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  //const url = "https://spammer-theta.vercel.app/api/posts";

  function handleChange(e) {
    setUserInput(e.target.value);
    //console.log(userInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //send request to server to add the message to database
    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //headers - json server is what we use so we telling the server to expect json
      },
      body: JSON.stringify({
        text: userInput,
        //converting js object into json
      }),
    });
    const info = await res.json();
    console.log(info);

    if (info.success) {
      setError("");
      setUserInput("");
      router.refresh();
    } else {
      setError(info.error);
    }
  }
  return (
    <div>
      <form className='add-spam-container' onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          name=''
          id=''
          cols='20'
          rows='10'
          onChange={handleChange}></textarea>
        <button className='submit-post-button'>Submit Post</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
