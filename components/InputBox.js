import Image from "next/image";
import { useSession } from "next-auth/react"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { useRef } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable, uploadString, uploadBytes, updateDoc } from "firebase/storage";


export default function InputBox() {
  const { data: session, status } = useSession();
  const inputRef  = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null)

  const sendPost = (e) => {
    e.preventDefault();

    if(!inputRef.current.value) return;

   addDoc(collection(db, "posts"),  {
        message:inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
    }).then(data => {
        if (imageToPost) {
            const imageRef = ref(storage, `posts/${data.id}`);
            removeImage();
           uploadString(imageRef, imageToPost, 'data_url').then((res) => {
            getDownloadURL(ref(storage, `posts/${data.id}`)).then((downloadURL) =>{
                const cityRef = doc(db, 'posts', data.id);
                setDoc(cityRef, { image: downloadURL }, { merge: true });
                console.log("valla oldu")
            })
           })
        }
    });

    inputRef.current.value = "";
  }  


  const addImageToPost = (e) => {
     const reader = new FileReader();
     if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
     };
     reader.onload = (readerEvent) => {
        setImageToPost(readerEvent.target.result)
     };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
        <Image 
        className="rounded-full"
        src={session.user.image}   
        width={40}
        height={40}
        layout="fixed"
        />
        <form className="flex flex-1 ">
        <input 
        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
        ref={inputRef}
        type="text" 
        placeholder={`What's on your mind, ${session.user.name}`} />
        <button hidden type="submit" onClick={sendPost}>Submit</button>
        </form>
        {imageToPost && (
            <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transation duration-150 transform hover:scale-105 cursor-pointer">
                <img className="h-10 object-contain" src={imageToPost} alt="" />
            </div>
        )}
        </div>
        <div className="flex justify-evenly p-3 border-t">
            <div className="inputIcon">
                <VideoCameraIcon className="h-7 text-red-500" />
                <p className="text-xs sm:text-sm xl:text-base">
                    Live Video
                </p>
            </div>
            <div onClick={() => filepickerRef.current.click()} className="inputIcon">
                <CameraIcon className="h-7 text-green-400" />
                <p className="text-xs sm:text-sm xl:text-base">
                    Photo/Video
                </p>
                <input ref={filepickerRef} onChange={addImageToPost} type="file" hidden/>
            </div>
            <div className="inputIcon">
                <EmojiHappyIcon className="h-7 text-yellow-300" />
                <p className="text-xs sm:text-sm xl:text-base">
                    Feeling/Activity
                </p>
            </div>
        </div>
    </div>
  )
}
