import React from 'react'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";

const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }
    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });
      alert('게시물이 추가되었습니다.');
      navigate("/posts");
    } catch (e) {
      console.error("Err", e);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='flex gap-4 mt-24 mb-8 text-4xl font-extrabold'>글 작성 <FaPencilAlt /> </h1>
      <form onSubmit={handleAddPost} className='flex flex-col w-[500px] h-[550px]   gap-4 p-4 border-2 rounded-md shadow-lg'>
        <p className='flex justify-between'> 작성자: <span className='text-gray-400'>{user.email}</span></p>
        <label className="block mb-1 font-bold">제목 </label>
        <input value={title} placeholder='제목을 작성해주세요' className='pb-2 border-b-2 rounded-md focus:outline-none' onChange={e => setTitle(e.target.value)} type="text" />
        
        <label className="block mb-1 font-bold">내용</label>
        <textarea value={content} className='flex-1 p-2 border border-gray-300 rounded-md focus:outline-none' onChange={e => setContent(e.target.value)} />

        <button type='submit' className='p-2 font-bold text-white bg-black rounded-md'>작성하기</button>
      </form >
    </div>
  )
}

export default AddPostPage