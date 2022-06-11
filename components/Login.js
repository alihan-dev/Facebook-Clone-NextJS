import React from 'react'
import Image from 'next/image';
import { signIn } from 'next-auth/react';
export default function Login() {
  return (
    <div className='grid place-items-center'>
      <Image src="/social-facebook-2019-circle-512.webp" 
          width={200} 
          height={200} 
          objectFit="contain" />
      <h1 onClick={signIn} className='mt-5 p-5 bg-blue-500 rounded-full text-white cursor-pointer'>Login with Facebook</h1>
    </div>
  )
}
