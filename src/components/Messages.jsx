"use client";
import API_URL from "@/lib/API-URL.js";
//import Message from "./Message.jsx";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useRouter } from "next/navigation.js";
import { Comments } from "./Comments.jsx";

import { useState } from "react";
import EditBox from "./EditBox.jsx";
import EditComments from "./EditComments.jsx";

export default function Messages({ posts }) {
  const router = useRouter();
  const [id, setId] = useState(""); //this is for the text box on edits to work
  const [commentVisible, setCommentVisible] = useState("");
  const [counter, setCounter] = useState(0);

  async function incrementLikes(id1) {
    const response = await fetch(`${API_URL}/api/posts/${id1}/likes`, {
      method: "POST",
      cache: "no-store",
    });
    router.refresh();
  }

  async function handleDeleteButton(id1) {
    const response = await fetch(`${API_URL}/api/posts/${id1}`, {
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
          <div key={post.id} className='single-post-container'>
            {id === post.id ? (
              <EditBox text={post.text} id={post.id} setId={setId} />
            ) : (
              <p>{post.text}</p>
            )}
            <button
              onClick={() => incrementLikes(post.id)}
              type='submit'
              className='icon-button'>
              <AiFillLike />
            </button>
            <span>{post.likes}</span>
            <button
              onClick={() => handleDeleteButton(post.id)}
              type='submit'
              className='icon-button'>
              <MdDelete />
            </button>
            <button onClick={() => setId(post.id)}>
              <MdEditSquare />
            </button>
            <button
              type='button'
              className='icon-button'
              onClick={() => setCommentVisible(post.id)}>
              <FaCommentDots />
            </button>
            {commentVisible === post.id && (
              <EditComments
                id={post.id}
                setCommentVisible={setCommentVisible}
                setCounter={setCounter}
              />
            )}
            <Comments id={post.id} counter={counter} />
          </div>
        );
      })}
    </div>
  );
}

//<Message post={post} />
//<div key={post.id}>{post.text}</div>
//<Message post={post}
