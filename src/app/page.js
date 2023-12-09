//import NewMessage from "@/components/NewMessage.jsx";
//import styles from "./page.module.css";
//import Messages from "@/components/Messages.jsx";
import Messages from "@/components/Messages.jsx";
import NewMessage from "@/components/NewMessage.jsx";
import API_URL from "@/lib/API-URL.js";
//import DeletePost from "@/components/DeletePost.jsx";
//import Message from "@/components/Message.jsx";

export default async function Home() {
  //GET messages
  const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
  const info = await res.json();
  const posts = info.posts;
  //console.log(info);
  console.log(posts);

  return (
    <div>
      <h1>Semsi's Spammer</h1>
      <NewMessage />
      <Messages posts={posts} />
    </div>
  );
}
