import React from 'react'
import { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/posts");
    } catch (e) {
      console.error("Error", e);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='mt-24 mb-8 text-4xl font-extrabold'>K-BLOG LOGIN</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-[400px]   gap-4 p-4 border-2 rounded-md shadow-lg'>
        <input className='p-2 mt-2 mb-2 border-b-2 focus:outline-none' placeholder='email' type="email" value={email} onChange={(e => setEmail(e.target.value))} />
        <input className='p-2 mb-2 border-b-2 focus:outline-none' placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className='p-2 text-white bg-black rounded-md' type='submit'>LOGIN</button>
      </form >
    </div>
    
  )
}

export default Login