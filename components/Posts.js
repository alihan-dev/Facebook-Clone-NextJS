// Necessary Imports
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, where } from "firebase/firestore";
import Post from "./Post";
import { useSession } from "next-auth/react"

export default function Posts() {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  useEffect(
          () =>
              onSnapshot(collection(db, "posts"), where("name", "==", session.user.name), (snapshot) => {
                  setData(
                      snapshot.docs.map((doc) => {
                          return { ...doc.data(), id: doc.id };
                      })
                  );
              }),
      []);
  
  console.log(data)
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
