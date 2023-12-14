//import NewMessage from "@/components/NewMessage.jsx";
//import styles from "./page.module.css";
//import Messages from "@/components/Messages.jsx";
import Messages from "@/components/Messages.jsx";
import NewMessage from "@/components/NewMessage.jsx";
import { prisma } from "@/lib/prisma.js";

//import DeletePost from "@/components/DeletePost.jsx";
//import Message from "@/components/Message.jsx";
export const dynamic = "force-dynamic";
export default async function Home() {
  //GET messages
  const posts = await prisma.post.findMany();
  //console.log(info);
  // console.log(posts);

  return (
    <div>
      <h1>Semsi's Spammer</h1>
      <NewMessage />
      <Messages posts={posts} />
    </div>
  );
}
