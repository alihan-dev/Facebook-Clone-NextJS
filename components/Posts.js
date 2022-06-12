// Necessary Imports
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";
import Post from "./Post";
import { useSession } from "next-auth/react"

export default function Posts() {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  useEffect(
          () =>
              onSnapshot(query(collection(db, "posts"),
              where("name", "==", session.user.name),
              orderBy('timestamp', 'desc')
              ), (snapshot) => {
                  setData(
                      snapshot.docs.map((doc) => {
                          return { ...doc.data(), id: doc.id };
                      })
                  );
              }),
      []);
  return (
    <div>
     {data?.map((post) => (
      <Post 
      key={post.id}
      name={post.name} 
      message={post.message} 
      email={post.email}
      postImage={post.image} />
     ))}
    </div>
  )
}
